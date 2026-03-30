import React from 'react';
import { Bot, Download, Users, Cpu } from 'lucide-react';

const Hero = ({ onDownloadClick, onAppointmentClick }) => {
  return (
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
                onClick={onDownloadClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all text-lg shadow-lg group"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" />
                Studie 2026 sichern
              </button>
              <button
                onClick={onAppointmentClick}
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
                <div className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900 whitespace-nowrap">Level 2030 Research</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
