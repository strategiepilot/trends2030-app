import React from 'react';

const PartnersSection = ({ partners }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10" id="partners">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-outfit uppercase">Die Herausgeber</h2>
        <p className="text-xl text-slate-500 font-medium mt-4">Kollaboration von Strategie-Beratung und Trend-Innovation.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {partners.map((partner) => (
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
  );
};

export default PartnersSection;
