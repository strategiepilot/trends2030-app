import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../utils/lucide-map';

const getIconGlassClasses = (colorName) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-600 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]',
    emerald: 'bg-emerald-500/10 text-emerald-600 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]',
    orange: 'bg-orange-500/10 text-orange-600 shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]',
  };
  return colors[colorName] || colors.blue;
};

const getHoverOverlayClasses = (colorName) => {
  const colors = {
    blue: 'bg-blue-600/90 shadow-blue-900/50',
    emerald: 'bg-emerald-600/90 shadow-emerald-900/50',
    orange: 'bg-orange-600/90 shadow-orange-900/50',
  };
  return colors[colorName] || colors.blue;
};

const getInvertedIconGlassClasses = (colorName) => {
  const colors = {
    blue: 'bg-white text-blue-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
    emerald: 'bg-white text-emerald-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
    orange: 'bg-white text-orange-600 shadow-[0_0_20px_rgba(255,255,255,0.4)]',
  };
  return colors[colorName] || colors.blue;
};

const TrendCard = ({ trend, onClick }) => {
  return (
    <div
      onClick={() => onClick(trend)}
      className="group relative bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[36px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 active:scale-95 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col h-[420px]"
    >
      {/* Vibrant Hover Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${trend.color === 'blue' ? 'bg-blue-500' : trend.color === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`} />

      {/* FRONT CONTENT */}
      <div className="relative z-10 flex flex-col h-full transition-opacity duration-500 group-hover:opacity-0">
        <div className={`w-24 h-24 rounded-[28px] flex items-center justify-center mb-8 border border-white/50 transition-transform duration-500 group-hover:scale-110 ${getIconGlassClasses(trend.color)}`}>
          {getIcon(trend.iconName, { className: 'w-12 h-12' })}
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

      {/* HERO HOVER OVERLAY */}
      <div className={`absolute inset-0 p-8 flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out backdrop-blur-2xl ${getHoverOverlayClasses(trend.color)}`}>
        <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-6 animate-breathe ${getInvertedIconGlassClasses(trend.color)}`}>
            {getIcon(trend.iconName, { className: 'w-8 h-8' })}
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
  );
};

export default TrendCard;
