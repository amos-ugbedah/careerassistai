import React from "react";

export default function Templates({ templates }) {
  if (!templates || templates.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {templates.map((t) => (
        <div
          key={t.id}
          className="relative group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/[0.05] hover:border-[#c7ae6a]/50 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-[#c7ae6a]/20 rounded-xl flex items-center justify-center text-[#c7ae6a]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
              {t.category || "General"}
            </span>
          </div>

          <h3 className="font-black text-xl mb-3 text-white group-hover:text-[#c7ae6a] transition-colors leading-tight italic tracking-tighter">
            {t.title}
          </h3>
          
          <p className="flex-grow mb-8 text-xs font-medium leading-relaxed text-gray-400">
            {t.description || "Access our vetted AI prompt guide for this specific professional use-case."}
          </p>

          <a
            href={t.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#c7ae6a] text-[#1a1a1a] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Download PDF
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}