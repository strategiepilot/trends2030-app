import React from 'react';
import { Users } from 'lucide-react';

const AuthorsSection = ({ authors }) => {
  return (
    <section className="py-24 px-6 bg-white/40 backdrop-blur-2xl border-t border-white/50 relative z-10" id="authors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight font-outfit">Das Autoren-Team</h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Ein interdisziplinäres Team aus Strategen, Technologie-Experten und Branchen-Insidern.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {authors.map((author, item) => (
            <div key={item} className="group relative bg-white/60 border border-white p-6 rounded-[32px] flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-default min-h-[340px]">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-50 flex-shrink-0 relative">
                {author.image ? (
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      author.id === 'markus' ? 'brightness-[1.14] contrast-[1.12]' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                    <Users className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply pointer-events-none" />
              </div>
              
              <div className="mt-6 z-10 transition-all duration-300 group-hover:opacity-0 group-hover:invisible">
                <h4 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">{author.name}</h4>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{author.role}</div>
              </div>

              {/* Hover Bio Overlay - Elegant Solid White Appearance */}
              <div className="absolute inset-0 bg-white p-8 flex flex-col justify-start items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 z-20 pt-16 shadow-inner">
                <h4 className="text-xl font-black text-slate-900 mb-6 tracking-tight flex-shrink-0">{author.name}</h4>
                
                {/* Scrollable Bio with German Hyphenation */}
                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar w-full">
                  <p 
                    className="text-[13px] text-slate-700 font-medium leading-relaxed text-left whitespace-pre-wrap"
                    lang="de"
                    style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
                  >
                    {author.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
