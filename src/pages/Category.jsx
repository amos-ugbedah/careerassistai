import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Category() {
  const { id } = useParams(); // 'id' will be 'ngo', 'remote', etc.
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("category", id) // Matches the slug from the URL
        .order("created_at", { ascending: false });

      if (!error) setArticles(data || []);
      setLoading(false);
    };
    fetchArticles();
  }, [id]);

  return (
    <div className="bg-[#f8f5ee] min-h-screen py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] uppercase tracking-tight">
            Track: <span className="text-[#c7ae6a]">{id.replace("-", " ")}</span>
          </h1>
          <p className="mt-4 italic text-gray-500">Showing all resources for {id}</p>
        </header>

        {loading ? (
          <div className="text-[#c7ae6a] font-bold">Scanning the vault...</div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link to={`/articles/${article.slug}`} key={article.id} className="group">
                <div className="flex flex-col h-full p-8 transition-all bg-white border border-gray-100 shadow-sm rounded-3xl group-hover:shadow-xl">
                  <span className="text-[10px] font-black uppercase text-[#c7ae6a] mb-4 tracking-[0.2em]">{article.category}</span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#c7ae6a] transition-colors">{article.title}</h3>
                  <p className="flex-grow mb-6 text-sm text-gray-600 line-clamp-3">{article.content}</p>
                  <span className="font-bold text-sm border-b-2 border-[#c7ae6a] self-start">Read Full Guide →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border-2 border-gray-200 border-dashed rounded-3xl">
            <h3 className="mb-2 text-xl font-bold">No guides found in this track yet.</h3>
            <p className="mb-6 text-gray-500">We are currently drafting new prompts for this category.</p>
            <Link to="/contact" className="text-[#c7ae6a] font-bold underline">Request a specific prompt</Link>
          </div>
        )}
      </div>
    </div>
  );
}