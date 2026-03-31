import React from 'react';
import { Users } from 'lucide-react';

const AuthorCard = ({ author }) => {
  return (
    <div className="group relative bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-default">
      {/* Author Image with subtle glow on hover */}
      <div className="relative mb-6 self-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500 bg-slate-50">
          <img 
            src={author.image} 
            alt={author.name} 
            className="w-full h-full object-cover transition-all duration-700" 
          />
          {/* Subtle Harmony Overlay */}
          <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply pointer-events-none" />
        </div>
      </div>

      <div className="text-center mt-2">
        <h4 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase">
          {author.name}
        </h4>
        <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest opacity-80">
          {author.role}
        </p>

        {/* Hover Bio Overlay - Elegant Solid White Appearance */}
        <div className="absolute inset-0 bg-white p-8 flex flex-col justify-start items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 z-20 pt-12 shadow-inner">
          <div className="w-8 h-1 bg-blue-600 rounded-full mb-4" />
          <h4 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase text-left">{author.name}</h4>
          <div className="text-[10px] font-bold text-blue-600 mb-6 uppercase tracking-widest text-left">{author.role}</div>
          
          {/* Scrollable Bio with German Hyphenation */}
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar w-full">
            <p 
              className="text-[13px] text-slate-700 font-medium leading-relaxed text-left"
              lang="de"
              style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
            >
              {author.bio || author.shortBio}
            </p>
          </div>
          
          <div className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-tighter flex-shrink-0">Herausgeber Expertise</div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
