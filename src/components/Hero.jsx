import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] pt-20 pb-16 lg:pt-32 lg:pb-24">
      {/* Subtle Background Pattern/Gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#c7ae6a] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#b99a45] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 grid items-center grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-2">
        {/* Left Side: Content */}
        <div>
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-[#1a1a1a] uppercase bg-[#c7ae6a] rounded-full">
            The #1 AI Career Toolkit
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
            Apply <span className="text-[#c7ae6a]">Smarter</span>, Not Harder.
          </h1>
          <p className="max-w-lg mb-10 text-xl leading-relaxed text-gray-300">
            Land your dream job with AI-powered tools, expert-crafted prompts, and 
            practical workflows designed for non-technical professionals.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#templates"
              className="px-8 py-4 bg-[#c7ae6a] text-[#1a1a1a] font-bold rounded-lg text-center hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Get Free Prompt Pack
            </a>
            <a
              href="#tools"
              className="px-8 py-4 font-bold text-center text-white transition-all bg-transparent border-2 rounded-lg border-white/20 hover:bg-white/10"
            >
              Browse AI Tools
            </a>
          </div>
          <p className="mt-4 text-sm italic text-gray-500">
            No credit card required. Start optimizing your CV in seconds.
          </p>
        </div>

        {/* Right Side: Trust Card/Visual */}
        <div className="hidden lg:block">
          <div className="p-8 border bg-white/5 border-white/10 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c7ae6a] flex items-center justify-center font-bold text-[#1a1a1a]">AI</div>
              <div>
                <h4 className="font-bold text-white">Smart Career Assistant</h4>
                <p className="text-xs text-gray-400 text-green-400">● System Ready</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-3/4 h-4 rounded bg-white/10"></div>
              <div className="w-full h-4 rounded bg-white/10"></div>
              <div className="w-5/6 h-4 rounded bg-white/10"></div>
              <div className="pt-4 mt-6 border-t border-white/10">
                <p className="text-[#c7ae6a] text-sm font-mono tracking-tighter">
                  // OPTIMIZING CV FOR NGO ROLES...
                </p>
              </div>
            </div>
          </div>
          
          {/* Trust Signal Logos */}
          <div className="flex items-center gap-8 mt-8 opacity-40 grayscale contrast-200">
             <span className="text-lg font-bold text-white">NGOs</span>
             <span className="text-lg font-bold text-white">Remote.co</span>
             <span className="text-lg font-bold text-white">Public Sector</span>
          </div>
        </div>
      </div>
    </section>
  );
}