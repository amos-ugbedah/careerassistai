import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
      } else {
        setMessage("Access Granted. Redirecting...");
        // Small delay to allow the user to see the success message
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      }
    } catch (err) {
      setMessage("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center px-6 selection:bg-[#c7ae6a] selection:text-[#1a1a1a]">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#c7ae6a] rounded-2xl flex items-center justify-center font-black text-[#1a1a1a] text-2xl mx-auto mb-4 shadow-xl">
            CA
          </div>
          <h1 className="text-3xl italic font-black tracking-tight text-white">Management Portal</h1>
          <p className="mt-2 text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#242424] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-[10px] font-black tracking-widest text-gray-400 uppercase ml-1">Admin Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#c7ae6a] transition-all font-bold"
                placeholder="admin@careerassistai.com"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-[10px] font-black tracking-widest text-gray-400 uppercase ml-1">Secret Key</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#c7ae6a] transition-all font-bold"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#c7ae6a] text-[#1a1a1a] font-black py-5 rounded-xl hover:bg-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs shadow-lg"
            >
              {loading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border ${
              message.includes("Granted") 
                ? "text-green-500 border-green-500/20 bg-green-500/5" 
                : "text-red-500 border-red-500/20 bg-red-500/5"
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-8 opacity-30">
          <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-bold">
            Encrypted Connection Active
          </p>
        </div>
      </div>
    </div>
  );
}