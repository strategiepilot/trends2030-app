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

      {/* Authors Section */}
      <section className="py-24 px-6 bg-white/40 backdrop-blur-2xl border-t border-white/50 relative z-10" id="authors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight font-outfit">Die Herausgeber</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Ein interdisziplinäres Team aus Strategen, Technologie-Experten und Branchen-Insidern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {authorsData.map((author, item) => (
              <div key={item} className="group relative bg-white/60 border border-white p-6 rounded-[32px] flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-default min-h-[340px]">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-50 flex-shrink-0 relative">
                  {author.image ? (
                    <img 
                      src={author.image} 
                      alt={author.name} 
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        author.id === 'markus' ? 'brightness-[1.14] contrast-[1.12]' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                      <Users className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                  {/* Subtle Harmony Overlay */}
                  <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply pointer-events-none" />
                </div>
                
                <div className="mt-6 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <h4 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">{author.name}</h4>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{author.role}</div>
                </div>

                {/* Hover Bio Overlay - Elegant Liquid Glass Appearance */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xl p-8 flex flex-col justify-center items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 z-20">
                  <div className="w-8 h-1 bg-blue-600 rounded-full mb-4" />
                  <h4 className="text-xl font-black text-slate-900 mb-1 tracking-tight">{author.name}</h4>
                  <div className="text-[10px] font-bold text-blue-600 mb-6 uppercase tracking-widest">{author.role}</div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed text-left">
                    {author.bio}
                  </p>
                  <div className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Herausgeber Expertise</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Floating CTA */}
      <div className={`fixed bottom-8 right-8 z-[90] transition-all duration-500 transform ${showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button
          onClick={() => { setModalType('download'); setDownloadError(null); setIsDownloadModalOpen(true); }}
          className="group relative flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-full shadow-2xl hover:shadow-blue-500/20 transition-all"
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