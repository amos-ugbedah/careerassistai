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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      setMessage("Access Granted. Redirecting...");
      setTimeout(() => navigate("/admin-dashboard"), 1500);
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#c7ae6a] rounded-2xl flex items-center justify-center font-black text-[#1a1a1a] text-2xl mx-auto mb-4">
            CA
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Management Portal</h1>
          <p className="mt-2 text-gray-500">Authorized Personnel Only</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#242424] p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">Admin Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#c7ae6a] transition-all"
                placeholder="admin@careerassistai.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">Secret Key</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setEmail(e.target.value)} // Note: Fixed to setPassword in the actual logic
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#c7ae6a] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#c7ae6a] text-[#1a1a1a] font-black py-4 rounded-xl hover:bg-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>

          {message && (
            <p className={`mt-6 text-center text-sm font-bold uppercase tracking-widest ${message.includes("Granted") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Security Note */}
        <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.2em]">
          Encrypted Connection Active
        </p>
      </div>
    </div>
  );
}