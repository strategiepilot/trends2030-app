import React from 'react';
import { X, Target, Check, Database } from 'lucide-react';
import { getIcon } from '../utils/lucide-map';

const getIconGlassClasses = (colorName) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-600 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]',
    emerald: 'bg-emerald-500/10 text-emerald-600 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]',
    orange: 'bg-orange-500/10 text-orange-600 shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]',
  };
  return colors[colorName] || colors.blue;
};

const TrendModal = ({ trend, onClose }) => {
  if (!trend) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white/80 backdrop-blur-3xl border border-white/60 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col animate-in fade-in zoom-in-90 duration-400 ease-out">

        {/* Modal Header */}
        <div className="sticky top-0 bg-white/60 backdrop-blur-xl p-8 border-b border-white/50 flex justify-between items-start z-10 shadow-sm">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center border border-white/50 shadow-sm ${getIconGlassClasses(trend.color)}`}>
              {getIcon(trend.iconName, { className: 'w-10 h-10' })}
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">
                Trend {trend.id.replace('t', '')} • {trend.category}
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{trend.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
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
                <span className={`w-3 h-8 rounded-full shadow-sm ${trend.color === 'blue' ? 'bg-blue-500' : trend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                Der Kern der Transformation
              </h4>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">
                {trend.description}
              </p>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50">
                <img src={trend.image} alt={trend.title} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Strategic Implications */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100 flex flex-col gap-6">
              <div className="flex items-center gap-4 text-blue-800">
                <Target className="w-8 h-8" />
                <h5 className="text-xl font-extrabold uppercase tracking-tight">Focus: Retail</h5>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">{trend.retail}</p>
            </div>
            <div className="p-8 bg-emerald-50/50 rounded-[32px] border border-emerald-100 flex flex-col gap-6">
              <div className="flex items-center gap-4 text-emerald-800">
                <Database className="w-8 h-8" />
                <h5 className="text-xl font-extrabold uppercase tracking-tight">Focus: Manufacturer</h5>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">{trend.manufacturer}</p>
            </div>
          </section>

          {/* Key Drivers */}
          <section className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
            <h5 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest text-center">Treiber der Veränderung</h5>
            <div className="flex flex-wrap justify-center gap-4">
              {trend.drivers.map((driver, idx) => (
                <div key={idx} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl shadow-sm flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-500" />
                  {driver}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-white/50 bg-white/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-slate-900 text-white font-extrabold rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendModal;
