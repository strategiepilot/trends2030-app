import React, { useState, useEffect } from 'react';

// Data
import trendsData from './data/trends.json';
import authorsData from './data/authors.json';
import settingsData from './data/settings.json';

// Components
import Hero from './components/Hero';
import ContextSection from './components/ContextSection';
import TrendCard from './components/TrendCard';
import TrendModal from './components/TrendModal';
import AuthorCard from './components/AuthorCard';
import HistoricalStudyModal from './components/HistoricalStudyModal';
import DownloadForm from './components/DownloadForm';

// Utils & Icons
import { getIcon } from './utils/lucide-map';
import { Download, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [modalType, setModalType] = useState('download'); // 'download' or 'appointment'
  const [downloadFormData, setDownloadFormData] = useState({ 
    name: '', 
    firma: '', 
    email: '', 
    phone: '', 
    dsgvo: false, 
    formsubmitConsent: false, 
    moreInfo: false 
  });
  const [isDownloadSubmitting, setIsDownloadSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Scroll observer for floating CTA
  useEffect(() => {
    const handleScroll = () => setShowFloatingCTA(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = ["all", "technologie", "konsum", "wettbewerb"];
  const tabNames = {
    all: "Alle Trends",
    technologie: "Technologie",
    konsum: "Konsumverhalten",
    wettbewerb: "Wettbewerb"
  };

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    setDownloadError(null);
    
    // Security: Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(downloadFormData.email)) {
      setDownloadError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setIsDownloadSubmitting(true);

    const payload = {
      Type: modalType === 'download' ? 'Whitepaper Download' : 'Experten-Termin Anfrage',
      Name: downloadFormData.name,
      Firma: downloadFormData.firma,
      Email: downloadFormData.email,
      Telefon: downloadFormData.phone || 'Nicht angegeben',
      "Datenschutz akzeptiert": downloadFormData.dsgvo ? 'Ja' : 'Nein',
      "Drittanbieter (FormSubmit) akzeptiert": downloadFormData.formsubmitConsent ? 'Ja' : 'Nein',
      "Mehr Infos gewünscht (Opt-In)": downloadFormData.moreInfo ? 'Ja' : 'Nein',
      "_subject": modalType === 'download'
        ? "Neuer Whitepaper Download: " + downloadFormData.name
        : "Anfrage Experten-Termin: " + downloadFormData.name,
      "_template": settingsData.formTemplate,
      "_captcha": "false",
      "_honey": "",
      "_replyto": downloadFormData.email
    };

    try {
      const response = await fetch(settingsData.formSubmitEndpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Transmission failed");
      
      setDownloadSuccess(true);
      
      if (modalType === 'download') {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = settingsData.whitepaperPdf;
          link.download = settingsData.whitepaperPdf.split('/').pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);
      }
    } catch (error) {
      console.error("Form transmission issue:", error);
      setDownloadError("Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.");
    } finally {
      setIsDownloadSubmitting(false);
    }
  };

  const filteredTrends = trendsData.filter(t => 
    (activeTab === 'all' || t.category === activeTab) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-slate-800 selection:bg-blue-200 relative">
      <style>{`
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .animate-breathe { animation: breathe 3.5s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <Hero 
        onDownloadClick={() => { setModalType('download'); setIsDownloadModalOpen(true); setDownloadSuccess(false); setDownloadError(null); }}
        onAppointmentClick={() => { setModalType('appointment'); setIsDownloadModalOpen(true); setDownloadSuccess(false); setDownloadError(null); }}
      />

      {/* Context & Methodology Section */}
      <ContextSection onStudyClick={setSelectedStudy} />

      {/* Trends Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="trends">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">Die 10 Kerntrends</h2>
            <div className="flex flex-wrap gap-3">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                    activeTab === tab ? 'bg-white shadow-md scale-105 text-blue-600' : 'bg-slate-200/50 hover:bg-white/50 text-slate-500'
                  }`}
                >
                  {tabNames[tab]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrends.map(trend => (
            <TrendCard key={trend.id} trend={trend} onClick={setSelectedTrend} />
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6 bg-slate-50/50 relative z-10" id="partners">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-outfit uppercase">Kooperationspartner</h2>
            <p className="text-xl text-slate-500 font-medium mt-4">Kollaboration von Strategie-Beratung und Trend-Innovation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {settingsData.partners.map((partner) => (
              <div key={partner.id} className="bg-white/80 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="w-full h-16 flex items-center mb-8">
                  <img src={partner.logo} alt={partner.name} className="h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{partner.name}</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-24 px-6 bg-white border-t border-slate-100 relative z-10" id="authors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight font-outfit">Die Herausgeber</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Ein interdisziplinäres Team aus Strategen, Technologie-Experten und Branchen-Insidern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {authorsData.map((author, idx) => (
              <AuthorCard key={idx} author={author} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Bereit für die Zukunft?
          </h2>
          <p className="text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
            Die Zukunft beginnt jetzt. Nutzen Sie exklusive Insights, um das Feld anzuführen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => { setModalType('download'); setIsDownloadModalOpen(true); setDownloadSuccess(false); setDownloadError(null); }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-600 font-black rounded-3xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all text-xl"
            >
              <Download className="w-6 h-6" />
              Studie 2026 sichern
            </button>
            <button
              onClick={() => { setModalType('appointment'); setIsDownloadModalOpen(true); setDownloadSuccess(false); setDownloadError(null); }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-blue-700/50 backdrop-blur-xl border border-blue-400/30 text-white font-black rounded-3xl hover:bg-blue-700/70 hover:shadow-xl hover:-translate-y-1 transition-all text-xl"
            >
              <Users className="w-6 h-6" />
              Termin mit Experten
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-bold text-slate-400">
          <div className="uppercase tracking-widest">
            © {new Date().getFullYear()} Bavaria Consulting Group & Space and Lemon Innovations
          </div>
          <div className="flex gap-8 uppercase tracking-widest">
            <a href={settingsData.impressumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Impressum</a>
            <a href={settingsData.datenschutzUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* Floating CTA Overlay */}
      <div className={`fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-3 transition-all duration-500 transform ${showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        
        {/* Appointment Bubble (Smaller) */}
        <button
          onClick={() => { setModalType('appointment'); setDownloadError(null); setIsDownloadModalOpen(true); setDownloadSuccess(false); }}
          className="group relative flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl border border-white/80 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900 pr-2">Expert-Talk</span>
        </button>

        {/* Download Bubble */}
        <button
          onClick={() => { setModalType('download'); setDownloadError(null); setIsDownloadModalOpen(true); setDownloadSuccess(false); }}
          className="group relative flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-full shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <Download className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mb-1">Studie</span>
            <span className="text-sm font-extrabold text-slate-900 leading-none">PDF sichern</span>
          </div>
        </button>
      </div>

      {/* Modals */}
      <TrendModal trend={selectedTrend} onClose={() => setSelectedTrend(null)} />
      <HistoricalStudyModal studyId={selectedStudy} onClose={() => setSelectedStudy(null)} />
      <DownloadForm 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)}
        modalType={modalType}
        formData={downloadFormData}
        setFormData={setDownloadFormData}
        isSubmitting={isDownloadSubmitting}
        success={downloadSuccess}
        error={downloadError}
        onSubmit={handleDownloadSubmit}
        whitepaperUrl={settingsData.whitepaperPdf}
      />
    </div>
  );
}