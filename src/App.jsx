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
import HistoricalStudyModal from './components/HistoricalStudyModal';
import DownloadForm from './components/DownloadForm';
import PartnersSection from './components/PartnersSection';
import AuthorsSection from './components/AuthorsSection';

// Utils & Icons
import { getIcon } from './utils/lucide-map';
import { Download, Check, X, Users, ArrowRight } from 'lucide-react';

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

  // Listen for modal open events from other components
  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e.detail && e.detail.type) {
        setModalType(e.detail.type);
        setDownloadError(null);
        setIsDownloadModalOpen(true);
      }
    };
    window.addEventListener('openDownloadModal', handleOpenModal);
    return () => window.removeEventListener('openDownloadModal', handleOpenModal);
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
    
    // Security: Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(downloadFormData.email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
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

      const result = await response.json();

      if (response.ok && result.success === "true" || result.success === true) {
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
      } else {
        const errorMsg = result.message || "Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut.";
        console.error("FormSubmit Error:", result);
        setDownloadError(errorMsg);
      }
    } catch (error) {
      console.error("Form transmission issue:", error);
      setDownloadError("Verbindungsproblem. Bitte prüfen Sie Ihre Internetverbindung.");
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
        onDownloadClick={() => { setModalType('download'); setDownloadError(null); setIsDownloadModalOpen(true); }}
        onAppointmentClick={() => { setModalType('appointment'); setDownloadError(null); setIsDownloadModalOpen(true); }}
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

      {/* Partners & Authors Sections - Modularized */}
      <PartnersSection partners={settingsData.partners} />
      <AuthorsSection authors={authorsData} />


      {/* Footer */}
      <footer className="relative z-10 mt-0 py-24 px-6 border-t border-slate-200 bg-white/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Bereit für die Zukunft?
          </h2>
          <p className="text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
            Die Zukunft beginnt jetzt. Nutzen Sie exklusive Insights, <br className="hidden lg:block" />um das Feld anzuführen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => { setModalType('download'); setIsDownloadModalOpen(true); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 bg-blue-600 text-white font-extrabold rounded-3xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all text-xl"
            >
              <Download className="w-6 h-6" />
              Studie 2026 sichern
            </button>
            <button
              onClick={() => { setModalType('appointment'); setIsDownloadModalOpen(true); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-5 bg-white/60 backdrop-blur-xl border border-white text-slate-900 font-extrabold rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all text-xl"
            >
              <Users className="w-6 h-6" />
              Termin mit Experten
            </button>
          </div>

          <div className="pt-20 text-sm font-semibold flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
            <div>
              © {new Date().getFullYear()} {settingsData.partners[0].name} and {settingsData.partners[1].name}
            </div>
            <div className="flex gap-6">
              <a href={settingsData.impressumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Impressum</a>
              <a href={settingsData.datenschutzUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Overlay */}
      <div
        className={`fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-3 transition-all duration-500 transform ${
          showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* Appointment Bubble (Smaller) */}
        <button
          onClick={() => { setModalType('appointment'); setDownloadError(null); setIsDownloadModalOpen(true); }}
          className="group relative flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl border border-white/80 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">Expert-Talk</span>
        </button>

        {/* Download Bubble */}
        <button
          onClick={() => { setModalType('download'); setDownloadError(null); setIsDownloadModalOpen(true); }}
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
        onClose={() => { setIsDownloadModalOpen(false); setDownloadError(null); }}
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