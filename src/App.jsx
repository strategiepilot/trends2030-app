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
import { Download } from 'lucide-react';

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

      {/* Authors Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">Die Herausgeber</h2>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
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

      {/* Footer / Partners */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:opacity-100 transition-opacity duration-700">
            {settingsData.partners.map((partner, idx) => (
              <a key={idx} href={partner.website} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt={partner.name} className="h-12 w-auto object-contain" />
              </a>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t border-slate-50 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
            &copy; 2026 Retail Trends 2030 • Strategiepilot & Partners
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className={`fixed bottom-8 right-8 z-[90] transition-all duration-500 transform ${showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button
          onClick={() => { setModalType('download'); setIsDownloadModalOpen(true); setDownloadSuccess(false); setDownloadError(null); }}
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