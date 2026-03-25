import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState(null);

  // Trend Data extracted from Whitepaper - all uniform formatting
  const trends = [
    {
      id: 't1',
      category: 'technologie',
      color: 'blue',
      icon: <Database className="w-12 h-12" />,
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

      {/* Ambient Animated Background (Apple Style) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-emerald-400/20 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      {/* Navigation - Liquid Glass */}
      <nav className="fixed top-0 w-full bg-white/40 backdrop-blur-xl z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">BC</div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">Retail 2030</span>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 text-slate-900 px-5 py-2.5 rounded-full font-semibold hover:bg-white hover:shadow-md transition-all">
            <Download className="w-4 h-4" />
            PDF Download
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-lg border border-white/60 text-sm font-semibold text-slate-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            Bavaria Consulting & Space and Lemon Innovations
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Die Neuerfindung der <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-orange-500">
              Wertschöpfungskette
            </span>
          </h1>
          <div className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium space-y-6">
            <p>
              Der Lebensmittel-Einzelhandel (LEH) steht nicht vor einer bloßen Veränderung, sondern vor einer tektonischen Verschiebung seiner Grundfesten. Während die Branche jahrelang über operative Effizienz diskutierte, transformiert sich der Handel nun zum „Betriebssystem des Konsums“.
            </p>
            <p className="text-lg md:text-xl text-slate-500">
              Gemeinsam werfen Bavaria Consulting und Space & Lemon einen ungeschönten Blick auf das Jahr 2030: Wo die Industrie Kontrolle verliert, wo der Handel zur Tech-Engine wird und welche Strategien heute über das Überleben von morgen entscheiden.
            </p>
          </div>
        </div>
      </section>

      {/* Herleitung / Context Section - Liquid Glass */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] p-8 md:p-16 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Wissenschaftliche Fundierung</h2>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Dieses Whitepaper ist keine Momentaufnahme, sondern das Ergebnis einer Dekade kontinuierlicher Branchenforschung. Die Dynamik hat sich durch Fortschritte in generativer KI und makroökonomische Veränderungen massiv beschleunigt.
                </p>
                
                <div className="space-y-6 pt-4">
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white flex items-center justify-center flex-shrink-0 text-slate-700 font-bold shadow-sm text-lg">15</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">LMU München</h4>
                      <p className="text-slate-600">Grundlagenstudie des Lebensmittelmarktes</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white flex items-center justify-center flex-shrink-0 text-slate-700 font-bold shadow-sm text-lg">19</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">DHBW Vertiefungsstudie</h4>
                      <p className="text-slate-600">32 C-Level Interviews aus LEH & Industrie</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md text-lg">26</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Neubewertung 2030</h4>
                      <p className="text-slate-600">Dualer Ansatz durch kompaktes Experten-Panel</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 backdrop-blur-md rounded-[32px] p-10 border border-white/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Der Analytische Rahmen</h3>
                <div className="space-y-5">
                  <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex items-start gap-5 transition-transform hover:-translate-y-1">
                    <Cpu className="w-8 h-8 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Neue Technologie</h4>
                      <p className="text-slate-600 font-medium">KI, Automatisierung & datengetriebene Modelle</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex items-start gap-5 transition-transform hover:-translate-y-1">
                    <Users className="w-8 h-8 text-emerald-500 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Neuer Konsum</h4>
                      <p className="text-slate-600 font-medium">Gesellschaftlicher Wandel, Gesundheit & Nachhaltigkeit</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex items-start gap-5 transition-transform hover:-translate-y-1">
                    <Target className="w-8 h-8 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Neuer Wettbewerb</h4>
                      <p className="text-slate-600 font-medium">Plattformmodelle, DTC & geopolitische Resilienz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Bento Grid Section */}
      <section id="trends" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Die 10 Kerntrends</h2>
            <p className="text-slate-600 max-w-2xl text-xl font-medium">
              Klicken Sie auf die Karten, um in die detaillierte Analyse einzutauchen.
            </p>
          </div>
          
          {/* Filter Tabs - Liquid Glass */}
          <div className="flex bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-full w-max shadow-sm">
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
              <section>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-4">
                  <span className={`w-3 h-8 rounded-full shadow-sm ${selectedTrend.color === 'blue' ? 'bg-blue-500' : selectedTrend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  Herleitung & Erklärung
                </h4>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                  {selectedTrend.description}
                </p>
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

      {/* Footer */}
      <footer className="relative z-10 mt-24 py-24 px-6 border-t border-slate-200 bg-white/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Bereit für die Zukunft?
          </h2>
          <p className="text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
            Laden Sie das vollständige Whitepaper herunter für detaillierte Marktprojektionen und Handlungsstrategien.
          </p>
          <button className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 mx-auto mt-8 text-lg">
            <Download className="w-6 h-6" />
            Whitepaper 2030 (PDF)
          </button>
          
          <div className="pt-20 text-sm font-semibold flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
            <div>
              Bavaria Consulting & Space and Lemon Innovations
            </div>
            <div>
              © April 2026 • info@bavaria-group.com
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}