import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to close mobile menu
  const closeMenu = () => setIsOpen(false);

  // FORCE SCROLL TO TOP: Used for Logo and Home link
  const scrollToTop = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (location.pathname === "/") {
      // If already on home, just scroll up
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on another page, navigate home and scroll up
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  // Smooth scroll offset for HashLinks (#tools, #templates)
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  return (
    <nav className="bg-[#1a1a1a] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-7xl">
        
        {/* Logo - Force Top */}
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#c7ae6a] rounded-lg flex items-center justify-center font-black text-[#1a1a1a] group-hover:rotate-6 transition-transform">
            CA
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CareerAssist<span className="text-[#c7ae6a]">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="items-center hidden gap-8 text-[10px] font-black uppercase tracking-widest md:flex">
          
          {/* Home Link - Force Top */}
          <Link 
            to="/" 
            onClick={scrollToTop} 
            className="text-gray-300 hover:text-[#c7ae6a] transition-colors"
          >
            Home
          </Link>
          
          <NavHashLink 
            smooth 
            to="/#tools" 
            scroll={scrollWithOffset}
            className="text-gray-300 hover:text-[#c7ae6a] transition-colors"
          >
            AI Tools
          </NavHashLink>

          <NavHashLink 
            smooth 
            to="/#templates" 
            scroll={scrollWithOffset}
            className="text-gray-300 hover:text-[#c7ae6a] transition-colors"
          >
            Prompts
          </NavHashLink>

          <Link to="/about" className="text-gray-300 hover:text-[#c7ae6a] transition-colors">Methodology</Link>
          
          <Link
            to="/contact"
            className="bg-[#c7ae6a] text-[#1a1a1a] px-6 py-3 rounded-xl font-black hover:bg-white transition-all shadow-lg active:scale-95"
          >
            Start Applying
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-b border-white/10 px-6 py-8 space-y-6 flex flex-col animate-in slide-in-from-top duration-300">
          
          <Link to="/" className="text-lg font-bold text-white" onClick={scrollToTop}>
            Home
          </Link>
          
          <NavHashLink 
            smooth 
            to="/#tools" 
            scroll={scrollWithOffset}
            className="text-lg font-bold text-white" 
            onClick={closeMenu}
          >
            AI Tools
          </NavHashLink>

          <NavHashLink 
            smooth 
            to="/#templates" 
            scroll={scrollWithOffset}
            className="text-lg font-bold text-white" 
            onClick={closeMenu}
          >
            Prompts
          </NavHashLink>

          <Link to="/contact" className="bg-[#c7ae6a] text-[#1a1a1a] py-4 rounded-xl font-black text-center shadow-xl" onClick={closeMenu}>
            Start Applying
          </Link>
        </div>
      )}
    </nav>
  );
}