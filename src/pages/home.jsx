import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Hero from "../components/Hero";
import FeaturedArticles from "../components/FeaturedArticles"; 
import Templates from "../components/Templates"; 

export default function Home() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [latestTemplates, setLatestTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch Top 3 Articles
        const { data: arts } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        // Fetch Top 4 Templates
        const { data: temps } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4);

        setLatestArticles(arts || []);
        setLatestTemplates(temps || []);
      } catch (err) {
        console.error("Home Data Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="bg-[#f8f5ee]">
      {/* 1. Impactful Hero Section */}
      <Hero />

      {/* 2. Dynamic Articles Section - ADDED ID="tools" */}
      <section id="tools" className="py-20 scroll-mt-20">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#c7ae6a] text-[10px] font-black uppercase tracking-[0.4em]">Editorial</span>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-[#1a1a1a]">Latest Insights</h2>
            </div>
            <a href="/articles" className="hidden md:block text-[10px] font-black uppercase tracking-widest border-b-2 border-[#c7ae6a] pb-1">
              View All Articles
            </a>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
               {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[2rem]"></div>)}
             </div>
          ) : (
            <FeaturedArticles articles={latestArticles} />
          )}
        </div>
      </section>

      {/* 3. Dynamic Templates Section - ADDED ID="templates" */}
      <section id="templates" className="bg-[#1a1a1a] py-24 rounded-t-[4rem] md:rounded-t-[6rem] scroll-mt-20">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-[#c7ae6a] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Resources</span>
            <h2 className="text-4xl italic font-black tracking-tighter text-white md:text-6xl">Popular Templates</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
               {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-white/5 animate-pulse rounded-3xl"></div>)}
            </div>
          ) : (
            <Templates templates={latestTemplates} />
          )}

          <div className="mt-16 text-center">
            <a href="/templates" className="inline-block bg-[#c7ae6a] text-[#1a1a1a] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Browse Full Library
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}