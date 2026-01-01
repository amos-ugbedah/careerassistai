import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      alert("Error sending message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#f8f5ee] min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          
          {/* Left Side */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
              How can we <span className="text-[#c7ae6a]">help?</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Have a specific job you're applying for? Need a custom AI prompt for a unique industry? 
              We’re here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 transition-colors rounded-2xl hover:bg-white">
                <div className="w-10 h-10 bg-[#c7ae6a] rounded-lg flex-shrink-0 flex items-center justify-center text-[#1a1a1a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a]">Custom Requests</h4>
                  <p className="text-sm text-gray-500">Tell us your niche, and we'll build a guide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c7ae6a] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-widest">Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c7ae6a] outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-widest">How can we help?</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#c7ae6a] outline-none transition-all resize-none"
                    placeholder="I'm looking for an AI workflow for..."
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white font-black py-5 rounded-2xl hover:bg-[#b99a45] transition-all transform active:scale-95 disabled:opacity-50 shadow-xl"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="w-24 h-24 bg-[#c7ae6a]/20 text-[#c7ae6a] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-[#1a1a1a] mb-4">Received!</h3>
                <p className="mb-8 leading-relaxed text-gray-500">We'll get back to you within 24-48 hours.</p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({name:"", email:"", message:""}); }}
                  className="text-[#b99a45] font-bold hover:text-[#1a1a1a] transition-colors"
                >
                  Send another request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}