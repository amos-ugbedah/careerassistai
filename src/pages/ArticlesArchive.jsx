import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Helmet } from "react-helmet-async";
import { handleSubscription } from "../lib/subscribe";

export default function ArticlesArchive() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerStatus, setFooterStatus] = useState("");

  const tags = ["All", "NGO Jobs", "Remote Work", "AI Prompts", "Productivity", "Public Sector", "CV Writing"];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setArticles(data || []);
      } catch (err) { console.error("Fetch Error:", err.message); }
      finally { setLoading(false); }
    };
    fetchArticles();
  }, []);

  const onFooterSubscribe = async (e) => {
    e.preventDefault();
    const result = await handleSubscription(footerEmail);
    setFooterStatus(result.message);
    if (result.success) setFooterEmail("");
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "All" || article.category === activeTag;
    return matchesSearch && matchesTag;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#f8f5ee] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#f8f5ee] min-h-screen">
      <Helmet>
        <title>The Archive | CareerAssistAI</title>
      </Helmet>

      <section className="bg-[#1a1a1a] text-white pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-12 text-6xl italic font-black tracking-tighter md:text-8xl">The Archive.</h1>
          <div className="flex flex-col gap-10">
            <input 
              type="text" 
              placeholder="Filter by keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#c7ae6a]" 
            />
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => setActiveTag(tag)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTag === tag ? "bg-[#c7ae6a] text-[#1a1a1a]" : "bg-white/5 text-gray-500 hover:text-white"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl px-6 py-24 mx-auto space-y-32">
        {filteredArticles.map((article) => (
          <article key={article.id} className="grid items-start grid-cols-1 gap-8 md:grid-cols-12 group">
            <div className="md:col-span-3 border-l-2 border-[#c7ae6a] pl-6 py-2">
              <time className="text-[10px] font-black text-gray-400 uppercase block mb-2">{new Date(article.created_at).toLocaleDateString()}</time>
              <span className="text-[9px] font-black text-[#1a1a1a] uppercase tracking-[0.2em] bg-white px-3 py-1 rounded">{article.category}</span>
            </div>
            <div className="md:col-span-9">
              <Link to={`/articles/${article.slug}`}>
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight group-hover:text-[#c7ae6a] transition-all italic tracking-tighter">{article.title}</h2>
              </Link>
              <p className="mb-10 text-lg leading-relaxed text-gray-500 line-clamp-3">{article.content.replace(/[#*]/g, '')}</p>
              <Link to={`/articles/${article.slug}`} className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:gap-8 transition-all">
                <span>Read Full Guide</span>
                <div className="w-12 h-[2px] bg-[#c7ae6a]"></div>
              </Link>
            </div>
          </article>
        ))}
      </main>

      {/* Footer Subscription */}
      <section className="px-6 py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white">
          <h2 className="mb-8 text-3xl italic font-black md:text-5xl">Stay Ahead of the Curve.</h2>
          <form onSubmit={onFooterSubscribe} className="flex flex-col justify-center gap-4 md:flex-row">
            <input 
              type="email" 
              required
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              placeholder="Your email address" 
              className="bg-white/5 border border-white/10 px-8 py-5 rounded-2xl outline-none focus:border-[#c7ae6a] w-full md:w-80" 
            />
            <button className="bg-[#c7ae6a] text-[#1a1a1a] font-black px-10 py-5 rounded-2xl uppercase text-xs hover:bg-white transition-all">Subscribe</button>
          </form>
          {footerStatus && <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#c7ae6a]">{footerStatus}</p>}
        </div>
      </section>
    </div>
  );
}