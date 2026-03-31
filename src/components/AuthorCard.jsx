import React from 'react';
import { Users } from 'lucide-react';

const AuthorCard = ({ author }) => {
  return (
    <div className="group relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer">
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />

      {/* Author Image with futuristic border */}
      <div className="relative mb-8 self-center">
        <div className="absolute inset-0 bg-blue-600 rounded-[32px] rotate-6 scale-105 opacity-0 group-hover:opacity-20 transition-all duration-500" />
        <div className="relative w-48 h-48 rounded-[32px] overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
          <img src={author.image} alt={author.name} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>
      </div>

      <div className="text-center flex-grow flex flex-col">
        <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors uppercase">
          {author.name}
        </h4>
        <p className="text-blue-600 font-extrabold text-xs uppercase tracking-widest mb-6 opacity-80">
          {author.role}
        </p>

        {/* Short Bio that appears on hover with Liquid Glass Overlay */}
        <div className="absolute inset-6 bg-white/95 backdrop-blur-3xl p-8 rounded-[32px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 border border-white/60 shadow-2xl z-20">
          <h5 className="text-xl font-black text-slate-900 mb-4 uppercase">{author.name}</h5>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {author.shortBio}
          </p>
          <div className="mt-8 pt-6 border-t border-slate-100 w-full text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertise & Transformation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
