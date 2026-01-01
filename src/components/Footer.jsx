import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("Joining...");
    
    const { error } = await supabase
      .from("subscribers")
      .insert([{ email }]);
    
    if (error) {
      if (error.code === "23505") {
        setStatus("You're already on the list! ✨");
      } else {
        setStatus("Something went wrong. Try again.");
      }
    } else {
      setStatus("Success! Welcome to the vault.");
      setEmail("");
    }

    // Auto-hide status after 5 seconds
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <footer className="bg-[#111111] text-gray-400 py-16 border-t border-white/5">
      <div className="grid grid-cols-1 gap-12 px-6 mx-auto max-w-7xl md:grid-cols-4">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#c7ae6a] rounded flex items-center justify-center font-bold text-[#1a1a1a] text-sm">
              CA
            </div>
            <span className="text-lg font-bold tracking-tight text-white">CareerAssistAI</span>
          </div>
          <p className="text-sm leading-relaxed">
            Practical AI workflows for modern professionals. Master the tools that matter.
          </p>
        </div>

        {/* Categories - Now Functional Paths */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Specialized Tracks</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/category/ngo" className="hover:text-[#c7ae6a] transition-colors">NGO & Development</Link></li>
            <li><Link to="/category/remote" className="hover:text-[#c7ae6a] transition-colors">Remote Work AI</Link></li>
            <li><Link to="/category/public-sector" className="hover:text-[#c7ae6a] transition-colors">Public Sector Jobs</Link></li>
            <li><Link to="/category/entry-level" className="hover:text-[#c7ae6a] transition-colors">Entry-Level Growth</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/category/reviews" className="hover:text-[#c7ae6a] transition-colors">AI Tool Reviews</Link></li>
            <li><Link to="/#templates" className="hover:text-[#c7ae6a] transition-colors">Prompt Library</Link></li>
            <li><Link to="/about" className="hover:text-[#c7ae6a] transition-colors">Our Methodology</Link></li>
            <li><Link to="/contact" className="hover:text-[#c7ae6a] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter - Functional */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Newsletter</h4>
          <p className="mb-4 text-xs">Get new prompts delivered to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-[#c7ae6a] text-white"
              />
              <button 
                type="submit" 
                className="bg-[#c7ae6a] text-[#1a1a1a] px-4 py-2 rounded font-bold text-sm hover:bg-white transition-colors"
              >
                Join
              </button>
            </div>
            {status && (
              <p className="text-[10px] text-[#c7ae6a] font-bold uppercase tracking-widest mt-1">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 px-6 pt-8 mx-auto mt-16 text-xs border-t max-w-7xl border-white/5 md:flex-row">
        <p>© {currentYear} CareerAssistAI. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/legal" className="transition-colors hover:text-[#c7ae6a]">Privacy Policy</Link>
          <Link to="/legal" className="transition-colors hover:text-[#c7ae6a]">Affiliate Disclosure</Link>
        </div>
      </div>
    </footer>
  );
}