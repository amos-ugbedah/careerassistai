import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TemplatesGallery() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "ngo", "remote", "public-sector", "entry-level"];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(false);
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  if (loading) return (
    <div className="min-h-screen bg-[#f8f5ee] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#f8f5ee] min-h-screen font-sans selection:bg-[#c7ae6a] selection:text-white">
      {/* Hero Header */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6 text-5xl italic font-black tracking-tighter md:text-7xl">Resource Library</h1>
          <p className="text-gray-400 uppercase tracking-[0.4em] text-xs font-bold">Premium Career & Development Assets</p>
        </div>
      </section>

      {/* Filter Navigation */}
      <nav className="sticky top-0 z-10 bg-[#f8f5ee]/80 backdrop-blur-md border-b border-gray-200 py-6">
        <div className="flex flex-wrap justify-center max-w-6xl gap-4 px-6 mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? "bg-[#c7ae6a] text-white shadow-lg" 
                : "bg-white text-gray-400 hover:bg-gray-100"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      </nav>

      {/* Grid Content */}
      <main className="max-w-6xl p-6 mx-auto md:p-12">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <span className="bg-gray-100 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-gray-500">
                    {template.category}
                  </span>
                  <div className="w-10 h-10 bg-[#f8f5ee] rounded-xl flex items-center justify-center text-[#c7ae6a] group-hover:bg-[#c7ae6a] group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-[#1a1a1a] mb-3 leading-tight uppercase italic tracking-tighter">
                  {template.title}
                </h3>
                
                <p className="mb-8 text-sm leading-relaxed text-gray-500 line-clamp-3">
                  {template.description}
                </p>

                <a 
                  href={template.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#1a1a1a] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c7ae6a] transition-all shadow-lg active:scale-95"
                >
                  Download Asset
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase">No resources found in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}