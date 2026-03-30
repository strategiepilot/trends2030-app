import { X, Target, Users, TrendingUp, Globe, Download } from 'lucide-react';

const HistoricalStudyModal = ({ studyId, onClose }) => {
  if (!studyId) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold shadow-lg ${studyId === '2015' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
              studyId === '2019' ? 'bg-gradient-to-br from-slate-700 to-slate-900' :
                'bg-gradient-to-br from-orange-400 to-orange-600'
              }`}>
              {studyId === '2026' ? <Target className="w-7 h-7" /> : studyId}
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {studyId === '2015' && "Grundlagenstudie 2015"}
                {studyId === '2019' && "Vertiefungsstudie 2019"}
                {studyId === '2026' && "Wissenschaftliches Fundament 2026"}
              </h3>
              <p className="text-slate-500 font-medium">
                {studyId === '2015' && "LMU München"}
                {studyId === '2019' && "DHBW Ravensburg"}
                {studyId === '2026' && "Methodischer Deep-Dive"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 pt-4 overflow-y-auto">
          {studyId === '2026' ? (
            <div className="space-y-12">
              <div className="bg-orange-50/50 p-8 rounded-[32px] border border-orange-100/50">
                <h4 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Die Drei-Säulen-Methodik</h4>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">Qualitatives Experten-Panel</h5>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Kompakte und tiefgreifende Branchenanalyse der neuen Dynamiken durch ein Panel aus führenden Innovationsexperten und Strategen.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">Trend-Synthese</h5>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Verknüpfung rasanter technologischer Innovationen (KI, Automatisierung) mit langfristigem gesellschaftlichem Wandel.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">Globale Marktprojektion</h5>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Scans internationaler Best-Practice-Modelle (Asian Blueprint) und die Ableitung ihrer Relevanz für den DACH-Raum.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button 
                  onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('openDownloadModal', { detail: { type: 'download' } })); }}
                  className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg group-hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Komplette Studie 2026 jetzt downloaden
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Methodology Card */}
              <div className="bg-gradient-to-br from-blue-50/80 to-white/50 backdrop-blur-md p-8 rounded-[32px] shadow-sm border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900">Methodik</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium mb-6">
                    {studyId === '2015'
                      ? "Kooperation mit der LMU München (Leitung Prof. Dr. Anton Meyer). Eine rigorose Desk-Research Analyse, bei der Trends nach Eintrittswahrscheinlichkeit und Branchenrelevanz bewertet wurden."
                      : "Strukturierte Expertenbefragung mit 32 Executives aus Handel und Industrie. Visualisierung der Ergebnisse in einer Matrix zur Identifikation einflussreicher Zukunftstrends."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="px-5 py-3 bg-white/80 rounded-2xl border border-blue-100/50 text-xs font-bold text-blue-700">
                      {studyId === '2015' ? "Fokus: Süßwaren als Trend-Seismograph" : "Horizont: 5-10 Jahre Prognose"}
                    </div>
                    <div className="px-5 py-3 bg-white/80 rounded-2xl border border-blue-100/50 text-xs font-bold text-blue-700">
                      {studyId === '2015' ? "Zeitrahmen: 8-wöchiger Prozess (KW 36-43)" : "Fokus: Relevanz- & Impact-Matrix"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Findings Section */}
              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-8 px-2">Die Top 3 Erkenntnisse</h4>
                <div className="grid grid-cols-1 gap-6">
                  {studyId === '2015' ? (
                    <>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-blue-600 mb-2">1. Singularisierung & Fragmentierung</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Ein Fünftel Einpersonenhaushalte erfordert neue Portionsgrößen & Convenience-Konzepte. Der Markt spaltet sich in Masse vs. Premium.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-blue-600 mb-2">2. Das „Gen-Z-Paradoxon“</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Warnung vor Überdigitalisierung. Ein wachsender Teil der Gen-Z sucht bewusst analoge Rückzugsorte – reine Digital-Strategien könnten entfremden.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-blue-600 mb-2">3. Auflösung der Mahlzeitenstrukturen</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">„Infinite Food“: Starre Tagesstrukturen lösen sich zugunsten permanenten Snackings auf. Fokus auf „Healthy Convenience“ im To-Go Bereich.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-indigo-600 mb-2">1. Big Data & KI in der Kundenansprache</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Präzise Cluster-Bildung & personalisierte Angebote. Während Online bereits stark ist, muss der stationäre Handel bei der Datengewinnung nachziehen.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-indigo-600 mb-2">2. „Entplastifizierung“</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Massive Relevanz bei Verbrauchsverpackungen. Größte Hürde bleibt das Spannungsfeld zwischen Produktsicherheit (Schutz vor Ausschuss) & Ökologie.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="text-lg font-extrabold text-indigo-600 mb-2">3. Online-Anteil & Cross-Channel</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">Prognose 10% Online-Anteil getrieben durch Gen Y/Z. Click & Collect bleibt zentral für die Zeitersparnis ohne Bindung an feste Lieferfenster.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalStudyModal;
