import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Helmet } from "react-helmet-async";
import { handleSubscription } from "../lib/subscribe";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "", success: false });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        console.error("Critical Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();

    const timer = setTimeout(() => {
      // Only show if they haven't just subscribed
      if (!status.success) setShowPopup(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [slug, status.success]);

  const onSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    const result = await handleSubscription(email);
    setStatus({ loading: false, message: result.message, success: result.success });
    
    if (result.success) {
      setEmail("");
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-[#c7ae6a]">
      <div className="w-12 h-12 border-4 border-[#c7ae6a] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black tracking-[0.2em] text-[10px] uppercase">Retrieving Content...</p>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-white p-6 text-center">
      <h2 className="mb-4 text-4xl italic font-black text-[#c7ae6a]">Article Missing</h2>
      <Link to="/articles" className="bg-[#c7ae6a] text-[#1a1a1a] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
        Back to Archive
      </Link>
    </div>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.content.substring(0, 160).replace(/[#*]/g, ''),
    "datePublished": article.created_at,
    "author": { "@type": "Organization", "name": "CareerAssistAI" }
  };

  return (
    <article className="bg-[#f8f5ee] min-h-screen font-sans selection:bg-[#c7ae6a] selection:text-white">
      <Helmet>
        <title>{article.title} | CareerAssistAI</title>
        <meta name="description" content={article.content.substring(0, 155).replace(/[#*]/g, '')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Pop-up Lead Magnet */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-[#1a1a1a]/95 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="relative bg-white p-10 md:p-16 rounded-[3rem] max-w-xl text-center shadow-2xl border border-[#c7ae6a]/20">
            <button onClick={() => setShowPopup(false)} className="absolute top-8 right-8 text-gray-300 hover:text-[#1a1a1a]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <span className="text-[#c7ae6a] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Free Resource</span>
            <h3 className="mb-6 text-3xl italic font-black leading-tight tracking-tighter text-[#1a1a1a] md:text-4xl">Get the "NGO Master <br/> Prompt Pack"</h3>
            <form onSubmit={onSubscribe} className="flex flex-col gap-3">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email" 
                className="bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none focus:border-[#c7ae6a] text-sm" 
              />
              <button disabled={status.loading} className="bg-[#1a1a1a] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#c7ae6a] transition-all disabled:opacity-50">
                {status.loading ? "Sending..." : "Send My Free Pack"}
              </button>
              {status.message && <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#c7ae6a]">{status.message}</p>}
            </form>
          </div>
        </div>
      )}

      <header className="bg-[#1a1a1a] pt-40 pb-32 px-6 relative">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link to="/articles" className="text-[#c7ae6a] text-[10px] font-black uppercase tracking-[0.4em] mb-10 inline-block border border-[#c7ae6a]/30 px-6 py-2 rounded-full hover:text-white transition-all">← Back to Archive</Link>
          <h1 className="mb-8 text-5xl md:text-7xl font-black leading-[0.9] text-white italic tracking-tighter">{article.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <span>{article.category}</span>
            <span className="text-gray-700">/</span>
            <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </header>

      <div className="relative z-20 max-w-4xl px-6 pb-24 mx-auto -mt-16">
        <div className="bg-white p-8 md:p-20 rounded-[3rem] shadow-2xl border border-gray-100/50">
          <div className="prose prose-stone md:prose-xl max-w-none">
            <p className="text-[#1a1a1a] leading-[1.8] font-medium whitespace-pre-wrap first-letter:text-5xl first-letter:font-black first-letter:text-[#c7ae6a] first-letter:mr-3 first-letter:float-left">
              {article.content}
            </p>
          </div>

          {article.affiliate_link && (
            <div className="mt-24 p-1 bg-gradient-to-br from-[#c7ae6a] to-[#1a1a1a] rounded-[2.5rem]">
               <div className="bg-[#1a1a1a] p-10 md:p-16 rounded-[2.4rem] text-white text-center">
                  <span className="text-[#c7ae6a] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Career-Growth Tool</span>
                  <h3 className="mb-6 text-3xl italic font-black leading-tight md:text-4xl">Elevate Your Strategy.</h3>
                  <a href={article.affiliate_link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#c7ae6a] text-[#1a1a1a] font-black px-12 py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs">Get Access Now</a>
               </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}