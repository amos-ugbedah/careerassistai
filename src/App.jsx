import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Utilities
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

// New Public Feature Pages
import TemplatesGallery from "./pages/TemplatesGallery"; // The one we just built
import ArticlesArchive from "./pages/ArticlesArchive";   // The blog list view

// Admin & Management
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col font-sans selection:bg-[#c7ae6a] selection:text-[#1a1a1a]">
      <ScrollToTop />
      
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Main Navigation */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Resource Library (Templates) */}
          <Route path="/templates" element={<TemplatesGallery />} />
          
          {/* Articles & Blog Engine */}
          <Route path="/articles" element={<ArticlesArchive />} /> {/* List of all articles */}
          <Route path="/articles/:slug" element={<ArticleDetail />} /> {/* Single article view */}
          <Route path="/category/:id" element={<Category />} />
          
          {/* Legal & Compliance */}
          <Route path="/legal" element={<Legal />} />

          {/* Management Portal */}
          <Route path="/admin-portal" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}