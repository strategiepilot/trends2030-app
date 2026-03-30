import React from 'react';
import { X, Check, ArrowRight, Download, Users, Smartphone, Shield, Globe } from 'lucide-react';

const DownloadForm = ({ isOpen, onClose, modalType, formData, setFormData, isSubmitting, success, error, onSubmit, whitepaperUrl }) => {
  if (!isOpen) return null;

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />
      
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/50 w-full max-w-4xl max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-500">
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Visual Left Side */}
          <div className={`hidden md:flex md:w-2/5 p-12 flex-col justify-between text-white relative overflow-hidden ${modalType === 'download' ? 'bg-gradient-to-br from-blue-600 to-indigo-800' : 'bg-gradient-to-br from-slate-800 to-slate-950'}`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_30%,#fff_0%,transparent_50%)]" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                {modalType === 'download' ? <Download className="w-8 h-8" /> : <Users className="w-8 h-8" />}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-6">
                {modalType === 'download' ? 'Strategisches Fundament 2026' : 'Zukunft gemeinsam gestalten'}
              </h3>
              <p className="text-white/80 font-medium leading-relaxed mb-8">
                {modalType === 'download' 
                  ? 'Sichern Sie sich den exklusiven Retail-Trends Report und transformieren Sie Ihr Business-Modell.' 
                  : 'Sprechen Sie direkt mit unseren Experten über Ihre individuelle KI-Roadmap und Transformationsstrategie.'}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-2xl border border-white/20">
                  <Smartphone className="w-5 h-5" /> 10 Kerntrends 2030
                </div>
                <div className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-2xl border border-white/20">
                  <Shield className="w-5 h-5" /> KI Operating Systems
                </div>
                <div className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-2xl border border-white/20">
                  <Globe className="w-5 h-5" /> Internationale Blueprints
                </div>
              </div>
            </div>
            
            <div className="relative z-10 pt-8 border-t border-white/20">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Level 2030 Transformation</span>
            </div>
          </div>

          {/* Form Right Side */}
          <div className="flex-1 p-8 md:p-14 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-90">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce transition-transform">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase leading-none">Vielen Dank!</h3>
                <p className="text-slate-600 text-lg font-medium max-w-sm mb-10">
                  {modalType === 'download' 
                    ? 'Der Download startet in wenigen Augenblicken automatisch. Wir haben Ihnen zudem eine Bestätigung gesendet.' 
                    : 'Ihre Anfrage wurde erfolgreich übermittelt. Wir setzen uns zeitnah mit Ihnen in Verbindung.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {modalType === 'download' && (
                    <a 
                      href={whitepaperUrl}
                      download={whitepaperUrl.split('/').pop()}
                      className="px-8 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Whitepaper laden
                    </a>
                  )}
                  <button 
                    onClick={onClose}
                    className="px-12 py-4 bg-slate-900 text-white font-extrabold rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                  >
                    Schließen
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="mb-10">
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    {modalType === 'download' ? 'Report Anfordern' : 'Termin Anfragen'}
                  </h3>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Kostenfreie Expertisen & Insights</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vor- & Nachname*</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Andreas Barth"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-bold text-slate-900"
                      value={formData.name}
                      onChange={e => handleFormDataChange({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unternehmen</label>
                    <input 
                      type="text" 
                      placeholder="Firma GmbH"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-bold text-slate-900"
                      value={formData.firma}
                      onChange={e => handleFormDataChange({...formData, firma: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business-Email*</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@firma.de"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-bold text-slate-900"
                    value={formData.email}
                    onChange={e => handleFormDataChange({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefon (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+49 123 456789"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-bold text-slate-900"
                    value={formData.phone}
                    onChange={e => handleFormDataChange({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="pt-4 space-y-4">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                      <input 
                        required
                        type="checkbox" 
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 bg-white transition-all checked:bg-blue-600 checked:border-blue-600 active:scale-90"
                        checked={formData.dsgvo}
                        onChange={e => handleFormDataChange({...formData, dsgvo: e.target.checked})}
                      />
                      <Check className="absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold leading-snug group-hover:text-slate-700 transition-colors">
                      Ich akzeptiere die Datenschutzbestimmungen und die Verarbeitung meiner Daten zum Zwecke der Report-Zusendung / Terminvereinbarung.*
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                      <input 
                        required
                        type="checkbox" 
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 bg-white transition-all checked:bg-blue-600 checked:border-blue-600 active:scale-90"
                        checked={formData.formsubmitConsent}
                        onChange={e => handleFormDataChange({...formData, formsubmitConsent: e.target.checked})}
                      />
                      <Check className="absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold leading-snug group-hover:text-slate-700 transition-colors">
                      Ich bin mit der Nutzung des Drittanbieters FormSubmit für die technische Übertragung meiner Formulardaten einverstanden.*
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                      <input 
                        type="checkbox" 
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 bg-white transition-all checked:bg-blue-600 checked:border-blue-600 active:scale-90"
                        checked={formData.moreInfo}
                        onChange={e => handleFormDataChange({...formData, moreInfo: e.target.checked})}
                      />
                      <Check className="absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold leading-snug group-hover:text-slate-700 transition-colors">
                      Senden Sie mir zukünftige Updates und Trend-Insights zu (Optionaler Opt-In).
                    </span>
                  </label>
                </div>

                <div className="pt-6">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                       <p className="text-xs text-red-600 font-bold leading-relaxed">{error}</p>
                    </div>
                  )}
                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-[24px] font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${isSubmitting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl shadow-blue-500/40 hover:-translate-y-1'}`}
                  >
                    {isSubmitting ? (
                      <div className="w-8 h-8 border-4 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {modalType === 'download' ? 'Report jetzt sichern' : 'Anfrage Absenden'}
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] font-black text-slate-400 mt-6 uppercase tracking-[0.2em]">Sicher • DSGVO Konform • Kostenlos</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;
