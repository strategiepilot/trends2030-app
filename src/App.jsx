import React, { useState, useEffect } from 'react';
import authorsData from './data/authors.json';
import settingsData from './data/settings.json';
import {
  Cpu,
  Smartphone,
  BarChart3,
  Bot,
  Leaf,
  HeartPulse,
  Coffee,
  Globe,
  TrendingUp,
  Shield,
  Download,
  ChevronRight,
  Database,
  Users,
  Target,
  X,
  ArrowRight,
  Search,
  Check
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [modalType, setModalType] = useState('download'); // 'download' or 'appointment'
  const [downloadFormData, setDownloadFormData] = useState({ name: '', firma: '', email: '', phone: '', dsgvo: false, formsubmitConsent: false, moreInfo: false });
  const [isDownloadSubmitting, setIsDownloadSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Scroll observer for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Computed Values
  const tabs = ["Alles", "Trends", "Technologie", "Konsumverhalten", "Nachhaltigkeit"];

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
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
      "_template": settingsData.formTemplate
    };

    try {
      await fetch(settingsData.formSubmitEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Form transmission issue:", error);
    }

    setIsDownloadSubmitting(false);
    setDownloadSuccess(true);

    // Trigger download programmatically ONLY for downloads
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
  };

  // Trend Data extracted from Whitepaper - all uniform formatting
  const trends = [
    {
      id: 't1',
      category: 'technologie',
      color: 'blue',
      icon: <Database className="w-12 h-12" />,
      image: '/Visuals/grafik_t1.jpg',
      subHeadline: 'Vom Produkt zum KI-Betriebssystem',
      title: 'Das neue Betriebssystem',
      front: 'KI-gestützte Orchestrierung der gesamten technologischen Wertschöpfungskette.',
      description: 'Der Lebensmittelhandel befindet sich in einer tiefgreifenden Transformation von einer primär produkt- und lieferantengetriebenen Logik hin zu einer technologie- und datenbasierten Steuerung. KI-gestützte Systeme fungieren als neues "Betriebssystem", das Einkaufsentscheidungen, Warenverfügbarkeit und Pricing dynamisch in Echtzeit orchestriert. Die Datenhoheit über Loyalty-Programme und Retail-Media Plattformen wird zur zentralen strategischen Ressource. Handelsmarken entwickeln sich dabei vom Preis-Einstieg zu eigenständigen Innovations-Treibern.',
      retail: 'Es entsteht die Chance, die Rolle in der Wertschöpfungskette massiv auszubauen. Händler können Sortimente kuratieren, Preise dynamisch steuern und eigene Marken als Differenzierung nutzen. Retail-Media erschließt zudem völlig neue Erlösquellen.',
      manufacturer: 'Zweit- und Drittmarken geraten extrem unter Druck. Hersteller müssen wesentlich stärker in eigene digitale Assets, Communities und Direct-to-Consumer-Kanäle investieren, um die Konsumentenbeziehung nicht komplett an den Handel zu verlieren.',
      drivers: ['Fortschritte in KI & Datenplattformen', 'Ökonomischer Margendruck', 'Datenhoheit & Retail Media', 'Stärkere Eigenmarkenstrategie'],
      hoverTitle: 'Die KI-Transformation',
      hoverText: 'Erfahren Sie, wie datengetriebene Echtzeit-Entscheidungen die Margen von morgen sichern.',
      hoverButton: 'Tech-Analyse öffnen'
    },
    {
      id: 't2',
      category: 'technologie',
      color: 'blue',
      icon: <Smartphone className="w-12 h-12" />,
      image: '/Visuals/grafik_t2.png',
      subHeadline: 'Die Fragmentierung der Kanäle',
      title: 'Omnichannel 2.0',
      front: 'Hybride Handelsstrukturen und automatisierte Micro-Markets im urbanen Raum.',
      description: 'Der Onlinehandel hat die Konsolidierungsphase verlassen und wird zum integralen Bestandteil hybrider Handelsstrukturen. Bei "Routine-Sortimenten" mit geringer emotionaler Bindung (z.B. Getränke, Tierfutter) wachsen automatisierte Liefermodelle stark. Parallel dazu entstehen stationär neue, technologiegetriebene Formate in urbanen Räumen: Automatisierte Micro-Markets und Self-Service-Stores bedienen zielgenau spontane Konsummissionen.',
      retail: 'Das Vertriebsmodell wird fragmentierter, aber deutlich effizienter. Es entstehen spezifische Kanäle für unterschiedliche Konsummissionen – vom großen Vollsortimenter für das emotionale Einkaufserlebnis bis zum autonomen 24/7 Micro-Market.',
      manufacturer: 'Die Komplexität im Channel-Management steigt erheblich. Sortimentsstrategien, Verpackungsgrößen und Preislogiken müssen nun exakt auf die hochgradig differenzierten Vertriebskanäle abgestimmt werden.',
      drivers: ['Generationswechsel', 'Urbanisierung', 'Personalmangel', 'Micro-Fulfillment Innovationen'],
      hoverTitle: 'Die neuen Flächen',
      hoverText: 'Entdecken Sie, wie hybride Modelle und autonome Stores den urbanen Raum erobern.',
      hoverButton: 'Vertriebswege erkunden'
    },
    {
      id: 't3',
      category: 'technologie',
      color: 'blue',
      icon: <BarChart3 className="w-12 h-12" />,
      image: '/Visuals/grafik_t3.png',
      subHeadline: 'Das Ende des klassischen Forecasts',
      title: 'Predictive Excellence',
      front: 'Übergang von klassischen Prognosen zu KI-gestützten Echtzeit-Simulationssystemen.',
      description: 'Die Supply-Chain verabschiedet sich von historischen Forecast-Zyklen. Moderne Predictive-Analytics-Plattformen integrieren externe Daten (Wetter, lokale Events, Social-Media-Signale), um dynamische Nachfrageprognosen zu erstellen. Kontinuierliche Simulationen von Bestandsplanung und Transportlogistik gepaart mit Micro-Fulfillment-Systemen machen die Lieferkette in Echtzeit anpassbar.',
      retail: 'Lagerkosten können signifikant reduziert und Out-of-Stock-Situationen nahezu eliminiert werden. Zudem können Promotions und Sortimentsanpassungen sehr viel punktgenauer und mit weniger Streuverlust gesteuert werden.',
      manufacturer: 'Es entsteht ein massiver Druck zur datenbasierten Kooperation. Die gemeinsame Nutzung von Prognosedaten hebt enorme Effizienzen, erzwingt aber ein völlig neues Maß an Transparenz entlang der Lieferkette.',
      drivers: ['Predictive Analytics', 'Steigende Logistikkosten', 'Zunehmende Datenverfügbarkeit', 'Logistik-Automatisierung'],
      hoverTitle: 'Die smarte Logistik',
      hoverText: 'Lesen Sie, wie Echtzeit-Simulationen das Ende der klassischen Supply Chain einläuten.',
      hoverButton: 'Effizienzen aufdecken'
    },
    {
      id: 't4',
      category: 'technologie',
      color: 'blue',
      icon: <Bot className="w-12 h-12" />,
      image: '/Visuals/grafik_t4.png',
      subHeadline: 'Kauf-Bots als neue Zielgruppe',
      title: 'Der autonome Shopper',
      front: 'Kauf-Bots und digitale Assistenten übernehmen die automatisierte Produktauswahl.',
      description: 'Der Kaufprozess verändert sich durch KI grundlegend. Bei unkritischen Routinekäufen entwickeln sich digitale Informationssysteme zu aktiven Entscheidungsinstanzen. KI-Assistenten analysieren Präferenzen, Preisniveaus und Nachhaltigkeitskriterien und lösen daraufhin selbstständig automatisierte Bestellungen aus. Der Shopper delegiert die Auswahl an Algorithmen.',
      retail: 'Die Kontrolle über die digitale Kundenschnittstelle wird zum wichtigsten Asset. Personalisierte Kundenansprache und exakte Vorhersagen des Kundenbedarfs entscheiden maßgeblich über den Markterfolg.',
      manufacturer: 'Marken stehen vor der enormen Herausforderung, auch in rein algorithmischen Entscheidungsumgebungen sichtbar zu bleiben. Sie müssen lernen, wie sie von automatisierten Bots priorisiert und ausgewählt werden.',
      drivers: ['Generative KI im Alltag', 'Smart-Home Integration', 'Individuelle Datenprofile'],
      hoverTitle: 'Algorithmen als Shopper',
      hoverText: 'Verstehen Sie die Dynamik, wenn Kauf-Bots und KI-Assistenten die Markentreue neu definieren.',
      hoverButton: 'Kaufverhalten analysieren'
    },
    {
      id: 't5',
      category: 'konsum',
      color: 'emerald',
      icon: <Leaf className="w-12 h-12" />,
      image: '/Visuals/grafik_t5.png',
      subHeadline: 'Glaubwürdigkeit trifft radikale Transparenz',
      title: 'Nachhaltigkeit Multidimensional',
      front: 'Ethical Sourcing, Tierwohl und lückenlose Transparenz entlang der Lieferkette.',
      description: 'Nachhaltigkeit wächst über den reinen Klimaschutz hinaus zu einem multidimensionalen Konzept der verantwortungsvollen Wertschöpfung. Der Fokus der Konsumenten verlagert sich stark auf "Ethical Sourcing" – die nachvollziehbare Einhaltung sozialer und ökologischer Standards, Tierwohl sowie die lückenlose Rückverfolgbarkeit der gesamten Lieferkette. Aus nachhaltigem Konsum wird ein "sinnstiftender Konsum".',
      retail: 'Glaubwürdige Nachhaltigkeit wird zur zwingenden Voraussetzung für Markenvertrauen. Händler müssen radikale Transparenz schaffen und eigene Nachhaltigkeitsprogramme sowie Labels konsequent vorantreiben.',
      manufacturer: 'Wer die Nachhaltigkeitsstandards nicht erfüllt, verliert sukzessive den Marktzugang. Zertifizierungen und transparente Lieferkettennachweise werden zur harten Eintrittsbedingung in die Sortimente der Händler.',
      drivers: ['Regulatorische Anforderungen', 'Gesellschaftlicher Wertewandel', 'Forderung nach Transparenz'],
      hoverTitle: 'Sinnstiftender Konsum',
      hoverText: 'Wie radikale Transparenz und Ethical Sourcing zur harten Währung im Regal werden.',
      hoverButton: 'Standards prüfen'
    },
    {
      id: 't6',
      category: 'konsum',
      color: 'emerald',
      icon: <HeartPulse className="w-12 h-12" />,
      image: '/Visuals/grafik_t6.png',
      subHeadline: 'Prävention als neues Kernprodukt',
      title: 'Longevity im Massenmarkt',
      front: 'Der Handel positioniert sich als aktiver Gesundheitsbegleiter.',
      description: 'Mit dem demografischen Wandel und steigendem Gesundheitsbewusstsein wird "Longevity" zum Massenmarkt. Ernährung wird primär als Prävention verstanden. Der Lebensmittelhandel überschreitet seine traditionellen Grenzen und verbindet funktionale Lebensmittel mit digitalen Ernährungsplattformen, Health-Apps und Ernährungsberatung direkt am Point of Sale.',
      retail: 'Es eröffnet sich die immense Chance, über die reine Distribution hinaus als ganzheitlicher Gesundheitsbegleiter tief und positiv im Alltag der Kunden verankert zu werden.',
      manufacturer: 'Der Innovationsdruck steigt rasant. Produkte müssen messbaren funktionalen Mehrwert bieten. Gesundheitliche Wirkungsversprechen müssen wissenschaftlich fundiert und überzeugend konzipiert sein.',
      drivers: ['Alternde Bevölkerung', 'Ernährungswissenschaftliche Fortschritte', 'Gesundheits- & Wearable-Trend'],
      hoverTitle: 'Prävention als Produkt',
      hoverText: 'Tauchen Sie ein in die Evolution des Handels zum aktiven Gesundheitsbegleiter.',
      hoverButton: 'Potenziale entdecken'
    },
    {
      id: 't7',
      category: 'konsum',
      color: 'emerald',
      icon: <Coffee className="w-12 h-12" />,
      image: '/Visuals/grafik_t7.jpg',
      subHeadline: 'Der POS als emotionale Bühne',
      title: 'Experience First',
      front: 'Transformation physischer Verkaufsflächen zu sozialen Erlebnisräumen.',
      description: 'Während Routinekäufe digitalisiert werden, transformiert sich der physische Supermarkt in einer Gegenbewegung zu einem sozialen Begegnungsraum. Die klassische Grenze zwischen Handel und Gastronomie verschwindet. Food Halls, Show-Cooking und hochwertige Aufenthaltsflächen machen den Einkauf zu einem inspirierenden Event – besonders wichtig in urbanen und alternden Gesellschaften.',
      retail: 'Hoher Investitionsbedarf in hybride Erlebnisformate. Verkaufsflächen müssen weniger als reine Lagerhallen, sondern zunehmend als emotionale Marken- und Gastronomie-Erlebnisräume konzipiert werden.',
      manufacturer: 'Der stationäre Raum bietet Herstellern völlig neue Möglichkeiten der Markeninszenierung. Physische Berührungspunkte und emotionale Produkterlebnisse am POS gewinnen wieder extrem an Wert.',
      drivers: ['Digitalisierungs-Gegenbewegung', 'Bedürfnis nach sozialer Interaktion', 'Verschmelzung mit Gastronomie'],
      hoverTitle: 'Der Raum als Bühne',
      hoverText: 'Warum die Verschmelzung von Gastronomie und Retail zur sozialen Notwendigkeit wird.',
      hoverButton: 'Erlebnis-Strategie ansehen'
    },
    {
      id: 't8',
      category: 'wettbewerb',
      color: 'orange',
      icon: <Globe className="w-12 h-12" />,
      image: '/Visuals/grafik_t8.jpg',
      subHeadline: 'Impulsive Entdeckung statt statischer Suche',
      title: 'The Asian Blueprint',
      front: 'Transfer asiatischer Plattformmodelle: "Discovery-First" statt Suche.',
      description: 'Innovative asiatische Plattformmodelle revolutionieren das Einkaufsverhalten weltweit. Die klassische Suchleiste ("Search") wird durch eine "Discovery-First"-Logik abgelöst: Algorithmen kuratieren Produkte unterhaltsam in Livestreams, Social-Commerce und Video-Feeds. Einkauf, Entertainment und Social Media verschmelzen nahtlos und fördern direkte, impulsive Käufe aus dem Content heraus.',
      retail: 'Klassisches E-Commerce greift zu kurz. Händler müssen dringend eigene digitale Plattformstrategien ausbauen und neue, unterhaltsame Formen der Kundeninteraktion adaptieren.',
      manufacturer: 'Ein Paradigmenwechsel im Marketing: Aufmerksamkeit entsteht heute durch Content, Communities und authentische Influencer-Interaktionen, nicht mehr durch den klassischen TV-Werbespot.',
      drivers: ['Erfolg asiatischer Plattformen', 'Social Commerce Wachstum', 'Algorithmische Empfehlungslogik'],
      hoverTitle: 'Die Discovery-Ära',
      hoverText: 'Begreifen Sie den Paradigmenwechsel von der klassischen Suche hin zum impulsiven Social Commerce.',
      hoverButton: 'Plattform-Logik verstehen'
    },
    {
      id: 't9',
      category: 'wettbewerb',
      color: 'orange',
      icon: <TrendingUp className="w-12 h-12" />,
      image: '/Visuals/grafik_t9.png',
      subHeadline: 'Der Frontalangriff der Spezialisten',
      title: 'DTC-Invasion',
      front: 'Agile Nischenmarken untergraben durch direkten Kundenkontakt etablierte Konzerne.',
      description: 'Niedrige technologische Einstiegshürden und gezieltes Social-Media-Marketing ermöglichen es Direct-to-Consumer (DTC) Marken, extrem schnell spezialisierte Nischen (z.B. proteinreich, vegan, zuckerfrei) zu besetzen. Sie binden loyale Communities direkt an sich und drängen erst ab einer erreichten kritischen Größe als gefragte Innovationstreiber in den klassischen Lebensmitteleinzelhandel.',
      retail: 'Der Handel fungiert hier stark als Trend-Scout und Kurator. Erfolgreiche DTC-Produkte müssen schnell ins Sortiment integriert werden, um jungen Zielgruppen relevante Innovationen zu bieten.',
      manufacturer: 'Große Konzerne stehen unter massivem Beschuss "von unten". Um gegen die agilen Nischenanbieter zu bestehen, müssen sie ihre eigenen Innovationszyklen dramatisch verkürzen und spezifischer entwickeln.',
      drivers: ['Social Media Marketing', 'Venture Capital Dynamik', 'Fragmentierte Kundenbedürfnisse'],
      hoverTitle: 'Angriff der Nischen',
      hoverText: 'Wie agile Direct-to-Consumer-Brands die etablierten Strukturen der Großkonzerne herausfordern.',
      hoverButton: 'Marktdynamik einsehen'
    },
    {
      id: 't10',
      category: 'wettbewerb',
      color: 'orange',
      icon: <Shield className="w-12 h-12" />,
      image: '/Visuals/grafik_t10.jpg',
      subHeadline: 'Regionale Resilienz statt Global Sourcing',
      title: 'Souveräne Angebote',
      front: 'Geopolitische Resilienz und Fokus auf regionale Wertschöpfungsketten.',
      description: 'Globale Machtverschiebungen machen Lebensmittel zunehmend zu strategischen Gütern. Versorgungssicherheit und regionale Resilienz prägen massiv das Kaufverhalten. Konsumenten und Politik fordern transparente Herkunft, wodurch regionale und europäische Wertschöpfungsketten nicht nur als vertrauenswürdig und nachhaltig, sondern auch als wirtschaftlich zukunftsfähig wahrgenommen werden.',
      retail: 'Lokale Lieferketten und glaubhafte regionale Herkunft steigen vom reinen Marketing-Label zum zentralen, strategischen Differenzierungsmerkmal im Regal auf.',
      manufacturer: 'Regionale Produzenten profitieren massiv von dieser Entwicklung. Global operierende Hersteller sind gezwungen, ihre hochkomplexen Lieferketten umzubauen, um mehr Resilienz und regionale Produktionsstrukturen zu etablieren.',
      drivers: ['Geopolitische Spannungen', 'Regulatorische Initiativen', 'Gesellschaftliches Sicherheitsbedürfnis'],
      hoverTitle: 'Geopolitik im Regal',
      hoverText: 'Ergründen Sie, warum Versorgungssicherheit und regionale Resilienz das globale Sourcing ablösen.',
      hoverButton: 'Resilienz-Faktoren lesen'
    }
  ];

  const filteredTrends = activeTab === 'all' ? trends : trends.filter(t => t.category === activeTab);

  // Helper for dynamic Liquid Glass colors (Icons on cards)
  const getIconGlassClasses = (colorName) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-600 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]',
      emerald: 'bg-emerald-500/10 text-emerald-600 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]',
      orange: 'bg-orange-500/10 text-orange-600 shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]',
    };
    return colors[colorName] || colors.blue;
  };

  // Helper for hover overlay state
  const getHoverOverlayClasses = (colorName) => {
    const colors = {
      blue: 'bg-blue-600/90 shadow-blue-900/50',
      emerald: 'bg-emerald-600/90 shadow-emerald-900/50',
      orange: 'bg-orange-600/90 shadow-orange-900/50',
    };
    return colors[colorName] || colors.blue;
  };

  // Helper for inverted hover icon (White glass background, colored icon)
  const getInvertedIconGlassClasses = (colorName) => {
    const colors = {
      blue: 'bg-white text-blue-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
      emerald: 'bg-white text-emerald-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
      orange: 'bg-white text-orange-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
    };
    return colors[colorName] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-slate-800 selection:bg-blue-200 relative">

      {/* Custom Animation for Breathing Effect */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-breathe {
          animation: breathe 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section - Futuristic Vision 2030 */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-4 items-center">
          
          {/* Left Side: Headline & CTA (Glass Card) */}
          <div className="col-span-12 lg:col-span-6 relative z-20 animate-slide-right">
            <div className="glass-card p-8 md:p-12 rounded-[40px] border-white/40 shadow-2xl backdrop-blur-3xl lg:-mr-20 lg:translate-x-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8">
                <Bot className="w-4 h-4" />
                Next Gen Retail Insight
              </div>
              
              <h1 className="flex flex-col mb-12">
                <span className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter block uppercase">
                  Die Transformation der <br />
                  <span className="text-blue-600 text-outline-white">Wertschöpfungskette</span>
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => { setModalType('download'); setIsDownloadModalOpen(true); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all text-lg shadow-lg group"
                >
                  <Download className="w-6 h-6 group-hover:animate-bounce" />
                  Studie 2026 sichern
                </button>
                <button 
                  onClick={() => { setModalType('appointment'); setIsDownloadModalOpen(true); }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white font-extrabold rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all text-lg shadow-lg"
                >
                  <Users className="w-6 h-6" />
                  Experten-Talk
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Futuristic Visual (Floating Island) */}
          <div className="col-span-12 lg:col-span-6 relative z-10 perspective-1000 animate-fade-scale">
            <div className="relative animate-float">
              {/* Image Container with 3D Tilt */}
              <div className="relative rounded-[48px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)] border-4 border-white/30 group">
                <img 
                  src="/Visuals/hero_vision.jpg" 
                  alt="Food Future 2030 Vision"
                  className="w-full h-auto object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                {/* Visual Glare/Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-white/20 pointer-events-none" />
              </div>
              
              {/* Decorative Labels or floating elements */}
              <div className="absolute -bottom-6 -left-6 glass-card px-6 py-4 rounded-3xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-sm font-extrabold text-slate-900 whitespace-nowrap">Future OS: Active</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 glass-card px-6 py-4 rounded-3xl">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-extrabold text-slate-900 whitespace-nowrap">Level 2030 Research</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Herleitung / Context Section - Liquid Glass */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] p-8 md:p-16 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
            {/* Single Column Redesign */}
            <div className="flex flex-col gap-16 items-center">
              
              {/* Header */}
              <div className="text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white text-sm font-bold text-slate-800 mb-6 shadow-sm">
                  <Target className="w-4 h-4 text-blue-500" />
                  Methodik & Forschungsdesign
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  Von der Beobachtung zur Strategie
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Dieses Whitepaper ist keine Momentaufnahme, sondern das strategische Destillat einer Dekade Branchenforschung. Die Marktdynamik hat sich durch Fortschritte in generativer KI und neue Wettbewerbsstrukturen massiv beschleunigt - unsere Methodik macht diese Dynamiken messbar.
                </p>
              </div>

              {/* Historische Timeline (Horizontal) - Jetzt klickbar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <button 
                  onClick={() => setSelectedStudy('2015')}
                  className="group flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-md rounded-[32px] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-500/20 text-xl mb-6 group-hover:scale-110 transition-transform">
                    2015
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-2">Ludwig-Maximilians-Universität München</h4>
                  <p className="text-slate-600 text-sm font-medium">Erste Grundlagenstudie zur Identifikation langfristiger Trends.</p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Details ansehen <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
                
                <button 
                  onClick={() => setSelectedStudy('2019')}
                  className="group flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-md rounded-[32px] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-extrabold shadow-lg shadow-slate-900/20 text-xl mb-6 group-hover:scale-110 transition-transform">
                    2019
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-2">Duale Hochschule Baden-Württemberg</h4>
                  <p className="text-slate-600 text-sm font-medium">Vertiefungsstudie auf Basis von 32 C-Level Experten-Interviews.</p>
                  <div className="mt-4 flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Details ansehen <ChevronRight className="w-3 h-3" />
                  </div>
                </button>

                <button 
                  onClick={() => setSelectedStudy('2026')}
                  className="group flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-md rounded-[32px] border-2 border-orange-500/20 shadow-xl shadow-orange-500/5 hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-orange-500/20 mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-2 underline decoration-orange-500/30 decoration-2 underline-offset-4">Aktuelle Studie 2026</h4>
                  <p className="text-slate-600 text-sm font-medium">Fokus: Praxisorientierte KI-Integration & neue Marktrealitäten im DACH-Raum.</p>
                  <div className="mt-4 flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider opacity-100 group-hover:scale-105 transition-all">
                    Drei-Säulen-Methodik <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Bento Grid Section */}
      <section id="trends" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Die 10 Kerntrends 2030</h2>
            <p className="text-slate-600 max-w-2xl text-xl font-medium">
              Klicken Sie auf die Karten, um in die detaillierte Analyse einzutauchen.
            </p>
          </div>

          {/* Filter Tabs - Liquid Glass */}
          <div className="flex flex-wrap sm:flex-nowrap bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-3xl sm:rounded-full w-full sm:w-max shadow-sm justify-center gap-2">
            {['all', 'technologie', 'konsum', 'wettbewerb'].map((tab) => {
              // Color mapping for tabs
              let tabColorClass = 'text-slate-500 hover:text-slate-800';
              let activeTabClass = 'text-slate-900';

              if (tab === 'technologie') { tabColorClass = 'text-blue-500 hover:text-blue-700'; activeTabClass = 'text-blue-600'; }
              if (tab === 'konsum') { tabColorClass = 'text-emerald-500 hover:text-emerald-700'; activeTabClass = 'text-emerald-600'; }
              if (tab === 'wettbewerb') { tabColorClass = 'text-orange-500 hover:text-orange-700'; activeTabClass = 'text-orange-600'; }

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? `bg-white shadow-md scale-105 ${activeTabClass}`
                      : `${tabColorClass} hover:bg-white/50`
                  }`}
                >
                  {tab === 'all' ? 'Alle Trends' : tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid - Uniform Columns, Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrends.map((trend) => (
            <div
              key={trend.id}
              onClick={() => setSelectedTrend(trend)}
              className="group relative bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[36px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 active:scale-95 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col h-[420px]"
            >
              {/* Vibrant Hover Glow effect matching category color */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${trend.color === 'blue' ? 'bg-blue-500' : trend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />

              {/* FRONT CONTENT */}
              <div className="relative z-10 flex flex-col h-full transition-opacity duration-500 group-hover:opacity-0">
                {/* Larger, Prominent Icon */}
                <div className={`w-24 h-24 rounded-[28px] flex items-center justify-center mb-8 border border-white/50 transition-transform duration-500 group-hover:scale-110 ${getIconGlassClasses(trend.color)}`}>
                  {trend.icon}
                </div>

                <div className="flex-grow">
                  <div className="text-xs font-bold tracking-widest uppercase mb-3 text-slate-500">
                    Trend {trend.id.replace('t', '')} • {trend.category}
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all">
                    {trend.title}
                  </h3>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    {trend.front}
                  </p>
                </div>
              </div>

              {/* HERO HOVER OVERLAY (Glassy & Vibrant) */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out backdrop-blur-2xl ${getHoverOverlayClasses(trend.color)}`}>
                <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">

                  {/* Breathing Inverted Icon */}
                  <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 animate-breathe ${getInvertedIconGlassClasses(trend.color)}`}>
                    {React.cloneElement(trend.icon, { className: 'w-8 h-8' })}
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-3">
                    {trend.hoverTitle}
                  </h4>
                  <p className="text-white/80 font-medium mb-6 line-clamp-3">
                    {trend.hoverText}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold bg-white/20 w-max px-6 py-3 rounded-full backdrop-blur-md">
                    {trend.hoverButton} <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Modal for Deep Dive - Liquid Glass Style */}
      {selectedTrend && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedTrend(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white/80 backdrop-blur-3xl border border-white/60 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col animate-in fade-in zoom-in-90 duration-400 ease-out">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white/60 backdrop-blur-xl p-8 border-b border-white/50 flex justify-between items-start z-10 shadow-sm">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center border border-white/50 shadow-sm ${getIconGlassClasses(selectedTrend.color)}`}>
                  {selectedTrend.icon}
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Trend {selectedTrend.id.replace('t', '')} • {selectedTrend.category}
                  </div>
                  <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{selectedTrend.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrend(null)}
                className="p-3 bg-white/60 hover:bg-white border border-white text-slate-600 rounded-full shadow-sm hover:shadow transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 sm:p-12 space-y-12">
              {/* Description Section */}
              <section className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-4">
                    <span className={`w-3 h-8 rounded-full shadow-sm ${selectedTrend.color === 'blue' ? 'bg-blue-500' : selectedTrend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                    {selectedTrend.subHeadline}
                  </h4>
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {selectedTrend.description}
                  </p>
                </div>

                {selectedTrend.image && (
                  <div className="w-full lg:w-[350px] shrink-0 group relative perspective-1000">
                    <div className="bg-white/50 backdrop-blur-md p-3 rounded-[32px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform lg:rotate-2 hover:rotate-0 transition-all duration-500 ease-out z-10 relative">
                      <div className="overflow-hidden rounded-[24px]">
                        <img
                          src={selectedTrend.image}
                          alt={selectedTrend.title}
                          className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                    {/* Decorative colored glow matching trend */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 -z-10 ${selectedTrend.color === 'blue' ? 'bg-blue-500' : selectedTrend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  </div>
                )}
              </section>

              {/* Consequences Grid - Glass Cards inside Modal */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/50 backdrop-blur-md p-10 rounded-[32px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  <h5 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-sm flex flex-col gap-1">
                    <span className="text-slate-400">Konsequenzen</span>
                    <span className="text-xl">Für den Handel</span>
                  </h5>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium relative z-10">
                    {selectedTrend.retail}
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-md p-10 rounded-[32px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  <h5 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-sm flex flex-col gap-1">
                    <span className="text-slate-400">Konsequenzen</span>
                    <span className="text-xl">Für Hersteller</span>
                  </h5>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium relative z-10">
                    {selectedTrend.manufacturer}
                  </p>
                </div>
              </div>

              {/* Drivers Section */}
              {selectedTrend.drivers && selectedTrend.drivers.length > 0 && (
                <section className="pt-8 border-t border-slate-200/50">
                  <h4 className="text-xl font-bold text-slate-900 mb-6">
                    Wesentliche Treiber dieses Trends
                  </h4>
                  <ul className="flex flex-wrap gap-4">
                    {selectedTrend.drivers.map((driver, idx) => (
                      <li key={idx} className="bg-white/80 backdrop-blur-md border border-white/80 text-slate-800 px-6 py-3 rounded-full text-sm font-bold shadow-sm">
                        {driver}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Partners Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Die Herausgeber</h2>
          <p className="text-xl text-slate-600 font-medium mt-4">Die Köpfe und Daten hinter der Retail 2030 Studie.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {settingsData.partners.map((partner) => (
            <div key={partner.id} className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
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
      </section>

      {/* Authors Section */}
      <section className="py-24 px-6 bg-white/40 backdrop-blur-2xl border-t border-white/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Meet the Authors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {authorsData.map((author, item) => (
              <div 
                key={item} 
                className="bg-white/60 border border-white p-6 rounded-[32px] flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden min-h-[400px]"
              >
                {/* Photo Container - Larger Ring */}
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-50 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-700 z-10">
                  {author.image ? (
                    <img 
                      src={author.image} 
                      alt={author.name} 
                      className={`w-full h-full object-cover grayscale-[0.05] contrast-[1.05] transition-all duration-1000 ${
                        author.id === 'markus' ? 'brightness-[1.14] contrast-[1.12]' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                      <Users className="w-16 h-16 opacity-50" />
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
                  <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{author.name}</h4>
                  <p 
                    className="text-[13px] text-slate-700 font-medium leading-relaxed text-left"
                    lang="de"
                    style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
                  >
                    {author.bio}
                  </p>
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

      {/* Floating CTA Overlay */}
      <div
        className={`fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 transition-all duration-500 transform ${
          showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* Appointment Bubble (Smaller) */}
        <button
          onClick={() => { setModalType('appointment'); setIsDownloadModalOpen(true); }}
          className="group relative flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-xl border border-white/80 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">Expert-Talk</span>
        </button>

        {/* Primary Download Bubble */}
        <button
          onClick={() => { setModalType('download'); setIsDownloadModalOpen(true); }}
          className="group relative flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)] hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            <Download className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mb-1">Studie</span>
            <span className="text-sm font-extrabold text-slate-900 leading-none">PDF sichern</span>
          </div>
        </button>
      </div>

      {/* Download Modal - Lead Gen */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 opacity-100 transition-opacity">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => !isDownloadSubmitting && setIsDownloadModalOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-500 scale-100 opacity-100">
            {/* Close Button */}
            <button
              onClick={() => setIsDownloadModalOpen(false)}
              disabled={isDownloadSubmitting}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            {downloadSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">Vielen Dank!</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Ihr Download startet nun automatisch. <br />
                  Sollte der Download nicht starten, klicken Sie bitte <a href="/Whitepaper_download.pdf" download className="text-blue-600 font-bold underline">hier</a>.
                </p>
                <button
                  onClick={() => {
                    setIsDownloadModalOpen(false);
                    setDownloadSuccess(false);
                  }}
                  className="mt-8 px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition-colors"
                >
                  Schließen
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-10">
                <div className="mb-8 pr-12">
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
                    {modalType === 'download' ? 'Studie sichern' : 'Experten-Termin'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {modalType === 'download'
                      ? 'Erhalten Sie exklusiven Zugriff auf die komplette Studie als PDF.'
                      : 'Lassen Sie sich praxisnah zeigen, welche Auswirkungen die Trends auf Ihr Geschäft haben.'}
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleDownloadSubmit}>
                  {/* FormSubmit Subject Configuration */}
                  <input type="hidden" name="_subject" value={modalType === 'download' ? 'Neuer Whitepaper-Download: Retail Trends 2030' : 'Anfrage Experten-Termin: Retail Trends 2030'} />

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={downloadFormData.name}
                        onChange={(e) => setDownloadFormData({...downloadFormData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Firma *</label>
                        <input
                          type="text"
                          name="firma"
                          required
                          value={downloadFormData.firma}
                          onChange={(e) => setDownloadFormData({...downloadFormData, firma: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                          placeholder="Unternehmensname"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={downloadFormData.email}
                          onChange={(e) => setDownloadFormData({...downloadFormData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                          placeholder="ihre@email.de"
                        />
                      </div>
                    </div>
                    {/* Telefonfeld (Pflicht bei Termin, Optional bei Download) */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">
                        Telefon {modalType === 'appointment' ? '*' : '(Optional)'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required={modalType === 'appointment'}
                        value={downloadFormData.phone}
                        onChange={(e) => setDownloadFormData({...downloadFormData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        placeholder="Für Rückfragen zum Termin / Rückruf"
                      />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          required
                          checked={downloadFormData.dsgvo}
                          onChange={(e) => setDownloadFormData({...downloadFormData, dsgvo: e.target.checked})}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        * Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zum Zwecke der Kontaktaufnahme und Bereitstellung des Downloads zu.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          required
                          checked={downloadFormData.formsubmitConsent}
                          onChange={(e) => setDownloadFormData({...downloadFormData, formsubmitConsent: e.target.checked})}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                      <span className="text-xs text-slate-600 leading-relaxed font-medium">
                        * Ich stimme ausdrücklich zu, dass meine eingegebenen Daten zur reinen Weiterleitung an die Bavaria Consulting Group über den externen Dienstleister <b>FormSubmit</b> verarbeitet werden.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={downloadFormData.moreInfo}
                          onChange={(e) => setDownloadFormData({...downloadFormData, moreInfo: e.target.checked})}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                        Ich würde sehr gerne mehr über Ihre Studie erfahren. (Optional)
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isDownloadSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 transition-all font-medium text-lg"
                  >
                    {isDownloadSubmitting ? (
                      <span className="animate-pulse">Wird gesendet...</span>
                    ) : (
                      <>
                        {modalType === 'download' ? <Download className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        {modalType === 'download' ? 'Jetzt Whitepaper herunterladen' : 'Terminanfrage senden'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            onClick={() => setSelectedStudy(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/50 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold shadow-lg ${
                  selectedStudy === '2015' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                  selectedStudy === '2019' ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                  'bg-gradient-to-br from-orange-400 to-orange-600'
                }`}>
                  {selectedStudy === '2026' ? <Target className="w-7 h-7" /> : selectedStudy}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {selectedStudy === '2015' && "Grundlagenstudie 2015"}
                    {selectedStudy === '2019' && "Vertiefungsstudie 2019"}
                    {selectedStudy === '2026' && "Wissenschaftliches Fundament 2026"}
                  </h3>
                  <p className="text-slate-500 font-medium">
                    {selectedStudy === '2015' && "LMU München"}
                    {selectedStudy === '2019' && "DHBW Ravensburg"}
                    {selectedStudy === '2026' && "Methodik & Forschungsdesign"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 pt-4 overflow-y-auto">
              {selectedStudy === '2026' ? (
                <div className="space-y-10">
                  <p className="text-lg text-slate-700 leading-relaxed font-semibold bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                    Das Ziel der aktuellen Studie ist eine praxisorientierte Einordnung technologischer Entwicklungen im Kontext der wirtschaftlichen Realität des Lebensmittelhandels. Wir nutzen einen Drei-Säulen-Ansatz:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Pillar 1 */}
                    <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm flex flex-col">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-3">1. Qualitatives Experten-Panel</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Kompakte und tiefgreifende Branchenanalyse der neuen Dynamiken durch ein Panel aus führenden Innovationsexperten und Strategen.
                      </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm flex flex-col">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-3">2. Trend-Synthese</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Verknüpfung rasanter technologischer Innovationen (KI, Automatisierung) mit langfristigem gesellschaftlichem Wandel.
                      </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm flex flex-col">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                        <Globe className="w-6 h-6 text-orange-500" />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-3">3. Globale Marktprojektion</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Scans internationaler Best-Practice-Modelle (Asian Blueprint) und die Ableitung ihrer Relevanz für den DACH-Raum.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-center">
                    <button 
                      onClick={() => { setSelectedStudy(null); setModalType('download'); setIsDownloadModalOpen(true); }}
                      className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Komplette Studie 2026 jetzt downloaden
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-slate-200 pl-6">
                      "Den Wandel nicht nur beobachten, sondern methodisch greifbar machen – das war das Ziel bereits vor einer Dekade."
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                    </p>
                  </div>
                  <div className="pt-8 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <div className="text-2xl font-bold text-slate-900">32</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interviews</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <div className="text-2xl font-bold text-slate-900">100%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fokus LEH</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end">
               <button 
                onClick={() => setSelectedStudy(null)}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}