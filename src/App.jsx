import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout & UI Components
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ArticleDetail from "./pages/ArticleDetail";
import Category from "./pages/Category"; 
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

// Feature Pages
import TemplatesGallery from "./pages/TemplatesGallery";
import ArticlesArchive from "./pages/ArticlesArchive";

// Admin & Auth
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col font-sans selection:bg-[#c7ae6a] selection:text-[#1a1a1a]">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Main User Navigation */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Library & Blog Routes */}
          <Route path="/templates" element={<TemplatesGallery />} />
          <Route path="/articles" element={<ArticlesArchive />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/category/:id" element={<Category />} />
          
          {/* Compliance & Admin */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin-portal" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* 404 Handler */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}