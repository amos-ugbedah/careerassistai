import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const principles = [
    {
      title: "Context Injection",
      desc: "Generic prompts produce generic results. Our methodology focuses on feeding AI specific career context to ensure outputs sound like a professional human, not a robot.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Zero-Code Workflows",
      desc: "We believe AI should be an equalizer. Our tools and guides are built for non-technical professionals who want the benefits of automation without learning to code.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "The 80/20 Advantage",
      desc: "Use AI to handle the 80% of repetitive tasks (drafting, formatting, and keyword matching) so you can focus 100% of your energy on the actual interview.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#f8f5ee] min-h-screen font-sans selection:bg-[#c7ae6a] selection:text-[#1a1a1a]">
      {/* Hero Section */}
      <section className="bg-[#1a1a1a] py-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-[#c7ae6a] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Built for the <span className="text-[#c7ae6a]">Modern Professional</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-400 md:text-xl">
            CareerAssistAI eliminates the friction of the modern job application 
            process through surgical AI implementation and human-centric design.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#1a1a1a]">Our Core Principles</h2>
            <div className="h-1 w-20 bg-[#c7ae6a] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {principles.map((p, index) => (
            <div key={index} className="p-10 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl hover:-translate-y-1">
              <div className="text-[#c7ae6a] mb-6 bg-[#f8f5ee] w-16 h-16 rounded-2xl flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Inclusivity Section */}
      <section className="px-6 py-24 bg-white border-gray-100 border-y">
        <div className="flex flex-col items-center max-w-5xl gap-16 mx-auto md:flex-row">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-8 leading-tight">
                AI Guidance for Every Step of Your Journey
            </h2>
            <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-600">
                    Most AI advice is written by tech insiders for other tech insiders. We noticed a gap: 
                    <strong> everyday professionals</strong>—from operations leads to creative managers—were being 
                    left behind because the tools felt like they required a "prompt engineering" degree.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                    Whether you are applying for your first role or transitioning into a senior leadership 
                    position, CareerAssistAI simplifies the AI layer. We provide the bridge between 
                    powerful technology and your unique career story.
                </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-[#1a1a1a] p-10 rounded-[2.5rem] shadow-2xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#c7ae6a] rounded-full flex items-center justify-center text-2xl">“</div>
                <p className="text-[#e3d6b4] text-xl md:text-2xl italic leading-relaxed mb-8">
                    "Our mission is to ensure that AI becomes an equalizer, not a barrier. 
                    You provide the talent; we provide the technology to make sure it gets noticed."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c7ae6a] to-[#d5c28f]"></div>
                    <div>
                        <p className="font-bold text-white">CareerAssistAI Team</p>
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">Founding Philosophy</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 text-center bg-[#f8f5ee]">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-6">Ready to apply smarter?</h2>
            <p className="mb-10 text-lg text-gray-600">
                Join the thousands of professionals using our workflows to save time and land interviews.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link 
                    to="/" 
                    className="bg-[#1a1a1a] text-white font-bold px-10 py-5 rounded-2xl hover:bg-[#b99a45] transition-all transform hover:scale-105 shadow-2xl shadow-black/20"
                >
                    Explore Toolkits
                </Link>
                <Link 
                    to="/contact" 
                    className="bg-white text-[#1a1a1a] border-2 border-gray-200 font-bold px-10 py-5 rounded-2xl hover:border-[#c7ae6a] transition-all"
                >
                    Request a Custom Prompt
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}