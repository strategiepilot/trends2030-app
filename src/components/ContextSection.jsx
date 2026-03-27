import React from 'react';
import { Target } from 'lucide-react';

const ContextSection = ({ onStudyClick }) => {
  return (
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
                onClick={() => onStudyClick('2015')}
                className="group flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-md rounded-[32px] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-500/20 text-xl mb-6 group-hover:scale-110 transition-transform">
                  2015
                </div>
                <h4 className="font-extrabold text-slate-900 mb-2">Grundlagenstudie</h4>
                <p className="text-sm text-slate-500 font-bold">LMU München</p>
              </button>

              <button
                onClick={() => onStudyClick('2019')}
                className="group flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-md rounded-[32px] border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-extrabold shadow-lg shadow-slate-500/20 text-xl mb-6 group-hover:scale-110 transition-transform">
                  2019
                </div>
                <h4 className="font-extrabold text-slate-900 mb-2">Vertiefungsstudie</h4>
                <p className="text-sm text-slate-500 font-bold">DHBW Ravensburg</p>
              </button>

              <button
                onClick={() => onStudyClick('2026')}
                className="group flex flex-col items-center text-center p-8 bg-blue-600/5 backdrop-blur-md rounded-[32px] border border-blue-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-600/20 text-xl mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-blue-700 mb-2">Trend Report 2026</h4>
                <p className="text-sm text-blue-600/60 font-black uppercase tracking-widest">Active Insight</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
