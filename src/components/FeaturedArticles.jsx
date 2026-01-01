import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedArticles({ articles }) {
  // If no articles are provided via props, show a placeholder grid
  if (!articles || articles.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {articles.map((a) => (
        <div
          key={a.id}
          className="flex flex-col p-6 transition-all duration-300 bg-white border border-gray-100 group rounded-2xl hover:shadow-xl hover:-translate-y-1"
        >
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#c7ae6a] bg-[#f8f5ee] px-3 py-1 rounded-full">
              {a.category || "Career Tool"}
            </span>
          </div>
          
          <h3 className="font-black text-xl mb-3 text-[#1a1a1a] group-hover:text-[#c7ae6a] transition-colors leading-tight italic">
            {a.title}
          </h3>
          
          <p className="mb-6 text-sm leading-relaxed text-gray-500 line-clamp-3">
            {a.content.replace(/[#*]/g, '').substring(0, 100)}...
          </p>
          
          <div className="mt-auto space-y-3">
            <Link
              to={`/articles/${a.slug}`}
              className="block w-full text-center py-2 text-[#1a1a1a] text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:border-[#c7ae6a] transition-all"
            >
              Read Review
            </Link>
            {a.affiliate_link && (
              <a
                href={a.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#c7ae6a] transition-colors shadow-lg"
              >
                Try This Tool
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}