import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles");
  const [subscribers, setSubscribers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [inquiries, setInquiries] = useState([]); 
  const [showRead, setShowRead] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: Search state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "", category: "ngo", content: "", affiliate_link: "", file_url: ""
  });

  const stats = {
    totalSubscribers: subscribers.length,
    newInquiries: inquiries.filter(i => i.status !== 'read').length,
    totalArticles: articles.length
  };

  const getFilePathFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subs, arts, temps, inqs] = await Promise.all([
        supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
        supabase.from("articles").select("*").order("created_at", { ascending: false }),
        supabase.from("templates").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false })
      ]);
      setSubscribers(subs.data || []);
      setArticles(arts.data || []);
      setTemplates(temps.data || []);
      setInquiries(inqs.data || []);
    } catch (err) {
      console.error("Critical Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/admin-portal");
      else fetchData();
    };
    checkUser();
  }, [navigate, fetchData]);

  const generateSlug = (text) => 
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFile(null);
    setFormData({ title: "", category: "ngo", content: "", affiliate_link: "", file_url: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalUrl = formData.file_url;
      const slug = generateSlug(formData.title);

      if (activeTab === "templates" && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('templates').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('templates').getPublicUrl(fileName);
        finalUrl = publicUrl;
      }

      const payload = activeTab === "templates" 
        ? { title: formData.title, category: formData.category, description: formData.content, file_url: finalUrl, type: "free", slug: slug }
        : { title: formData.title, category: formData.category, content: formData.content, affiliate_link: formData.affiliate_link, slug: slug };

      const { error } = editingId 
        ? await supabase.from(activeTab).update(payload).eq('id', editingId)
        : await supabase.from(activeTab).insert([payload]);
      
      if (error) throw error;
      resetForm();
      await fetchData();
    } catch (err) {
      alert(`System Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (table, item) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      if (table === "templates" && item.file_url) {
        const fileName = getFilePathFromUrl(item.file_url);
        if (fileName) await supabase.storage.from('templates').remove([fileName]);
      }
      const { error } = await supabase.from(table).delete().eq('id', item.id);
      if (error) throw error;
      await fetchData();
    } catch (err) {
      alert(`Delete Error: ${err.message}`);
    }
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title, category: item.category,
      content: item.content || item.description || "",
      affiliate_link: item.affiliate_link || "",
      file_url: item.file_url || "" 
    });
    setIsModalOpen(true);
  };

  const handleReply = async (inq) => {
    const subject = encodeURIComponent(`Regarding your inquiry: ${inq.name}`);
    const body = encodeURIComponent(`Hi ${inq.name},\n\nWe received your message:\n"${inq.message}"\n\n`);
    window.location.href = `mailto:${inq.email}?subject=${subject}&body=${body}`;
    await supabase.from("inquiries").update({ status: 'read' }).eq('id', inq.id);
    fetchData();
  };

  const toggleReadStatus = async (inq) => {
    const newStatus = inq.status === 'read' ? 'new' : 'read';
    const { error } = await supabase.from("inquiries").update({ status: newStatus }).eq('id', inq.id);
    if (error) alert("Could not update status.");
    else fetchData();
  };

  const copySubscribers = () => {
    const emails = subscribers.map(s => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    alert("Subscriber emails copied!");
  };

  const exportToCSV = () => {
    const headers = ["Email", "Joined Date"];
    const rows = subscribers.map(s => [s.email, new Date(s.created_at).toDateString()]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `subscribers_${new Date().toLocaleDateString()}.csv`);
    link.click();
  };

  // NEW: Filter logic for searching
  const filteredItems = (activeTab === "articles" ? articles : templates).filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center text-[#c7ae6a]">
      <div className="w-12 h-12 border-4 border-[#c7ae6a] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black tracking-[0.2em] text-[10px] uppercase">Authorizing...</p>
    </div>
  );

  return (
    <div className="bg-[#f8f5ee] min-h-screen flex font-sans">
      <aside className="fixed z-20 flex flex-col h-full text-white bg-[#1a1a1a] w-20 md:w-64 transition-all">
        <div className="flex justify-center p-6 border-b border-white/5 md:justify-start">
          <div className="w-10 h-10 bg-[#c7ae6a] rounded-xl flex items-center justify-center text-[#1a1a1a] font-black text-xl">C</div>
        </div>
        <nav className="flex-grow p-4 mt-6 space-y-2">
          {['subscribers', 'broadcast', 'inquiries', 'articles', 'templates'].map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); resetForm(); setSearchTerm(""); }} 
              className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-[#c7ae6a] text-[#1a1a1a] shadow-lg" : "text-gray-500 hover:bg-white/5"}`}>
              <span className="hidden md:block">{tab}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => navigate("/admin-portal"))} className="p-8 text-[10px] font-black text-gray-500 hover:text-red-400 border-t border-white/5 uppercase tracking-[0.2em]">Sign Out</button>
      </aside>

      <main className="flex-grow p-6 ml-20 transition-all md:p-12 md:ml-64">
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subscribers</p>
            <h3 className="text-4xl font-black text-[#1a1a1a] italic">{stats.totalSubscribers}</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Inquiries</p>
            <h3 className="text-4xl font-black text-[#c7ae6a] italic">{stats.newInquiries}</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Articles</p>
            <h3 className="text-4xl font-black text-[#1a1a1a] italic">{stats.totalArticles}</h3>
          </div>
        </div>

        <header className="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-end">
          <div className="flex-grow">
            <h1 className="text-5xl font-black text-[#1a1a1a] capitalize tracking-tighter italic">{activeTab}</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Management Dashboard</p>
            
            {/* NEW: Search Input specifically for Content Tabs */}
            {['articles', 'templates'].includes(activeTab) && (
              <div className="max-w-md mt-6">
                <input 
                  type="text" 
                  placeholder={`Quick search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold shadow-sm focus:border-[#c7ae6a] outline-none transition-all"
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            {activeTab === "subscribers" && (
              <button onClick={exportToCSV} className="bg-white text-[#1a1a1a] border border-gray-200 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 shadow-sm">Download CSV</button>
            )}
            {activeTab === "inquiries" && (
              <button onClick={() => setShowRead(!showRead)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${showRead ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-400 border-gray-100"}`}>{showRead ? "Showing All" : "New Only"}</button>
            )}
            {!['subscribers', 'inquiries', 'broadcast'].includes(activeTab) && (
              <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#c7ae6a] hover:text-[#1a1a1a] shadow-2xl transition-all">+ Add New</button>
            )}
          </div>
        </header>

        <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === "subscribers" ? (
             <table className="w-full text-left">
              <thead><tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="p-6">Email</th><th className="p-6">Joined</th></tr></thead>
              <tbody className="divide-y divide-gray-50">{subscribers.map(sub => (<tr key={sub.id} className="hover:bg-gray-50/30"><td className="p-6 font-bold text-[#1a1a1a]">{sub.email}</td><td className="p-6 text-xs text-gray-400">{new Date(sub.created_at).toDateString()}</td></tr>))}</tbody>
            </table>
          ) : activeTab === "broadcast" ? (
            <div className="p-16 text-center"><div className="max-w-md mx-auto"><div className="w-16 h-16 bg-[#f8f5ee] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📣</div><h3 className="mb-4 text-2xl italic font-black">Newsletter Broadcast</h3><p className="mb-8 text-sm text-gray-400">Copy all {subscribers.length} subscriber emails for BCC.</p><button onClick={copySubscribers} className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Copy BCC List</button></div></div>
          ) : activeTab === "inquiries" ? (
            <div className="divide-y divide-gray-50">
              {inquiries.filter(inq => showRead ? true : (inq.status !== 'read')).map(inq => (
                <div key={inq.id} className={`p-8 transition-all ${inq.status === 'read' ? 'opacity-50' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div><h4 className="text-lg font-black text-[#1a1a1a]">{inq.name}</h4><p className="text-sm font-bold text-[#c7ae6a]">{inq.email}</p></div>
                    <div className="flex gap-3">
                      <button onClick={() => handleReply(inq)} className="px-5 py-2 bg-gray-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-500">Reply</button>
                      <button onClick={() => toggleReadStatus(inq)} className="px-5 py-2 bg-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest">{inq.status === 'read' ? 'Mark New' : 'Mark Read'}</button>
                      <button onClick={() => handleDelete("inquiries", inq)} className="px-5 py-2 bg-gray-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-400">Delete</button>
                    </div>
                  </div>
                  <p className="p-4 text-sm italic text-gray-500 border border-gray-100 bg-gray-50 rounded-2xl">"{inq.message}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {/* NEW: Using filteredItems instead of the raw state */}
              {filteredItems.map(item => (
                <div key={item.id} className="flex flex-col items-center justify-between gap-6 p-8 transition-all md:flex-row hover:bg-gray-50/30">
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-black text-[#1a1a1a] leading-tight mb-2">{item.title}</h4>
                    <span className="text-[9px] font-black bg-[#1a1a1a] text-white px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(item)} className="px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-all">Edit</button>
                    <button onClick={() => handleDelete(activeTab, item)} className="px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="p-20 text-xs font-black tracking-widest text-center text-gray-300 uppercase">No matching {activeTab} found</div>
              )}
            </div>
          )}
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/95 backdrop-blur-xl">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 md:p-14 relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-10 italic tracking-tighter">{editingId ? 'Modify' : 'Create'} {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Display Title</label><input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-8 py-5 border border-gray-100 bg-gray-50 rounded-[1.5rem] outline-none font-bold" /></div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category Tag</label><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-8 py-5 border border-gray-100 bg-gray-50 rounded-[1.5rem] outline-none font-bold">
                    <option value="ngo">NGO & Development</option><option value="remote">Remote Work AI</option><option value="public-sector">Public Sector</option><option value="entry-level">Entry Level</option></select></div>
                {activeTab === "articles" && (<div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Affiliate Link</label><input value={formData.affiliate_link} onChange={(e) => setFormData({...formData, affiliate_link: e.target.value})} className="w-full px-8 py-5 border border-gray-100 bg-gray-50 rounded-[1.5rem] outline-none font-bold" /></div>)}
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Body Description</label><textarea required rows="5" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-8 py-5 border border-gray-100 bg-gray-50 rounded-[1.5rem] outline-none resize-none font-medium leading-relaxed" /></div>
              {activeTab === "templates" && (
                <div className="p-10 border-2 border-[#1a1a1a]/5 border-dashed rounded-[2rem] bg-gray-50">
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full text-xs font-black text-gray-400" />
                  {editingId && formData.file_url && !file && <p className="mt-4 text-[9px] font-black text-green-600 uppercase tracking-widest">✓ Current file preserved</p>}
                </div>
              )}
              <div className="flex flex-col gap-4 pt-6 md:flex-row">
                <button type="submit" disabled={isSaving} className="flex-grow bg-[#1a1a1a] text-white font-black py-6 rounded-[1.5rem] hover:bg-[#c7ae6a] hover:text-[#1a1a1a] transition-all uppercase tracking-widest text-xs">{isSaving ? "Processing..." : "Commit Changes"}</button>
                <button type="button" onClick={resetForm} className="px-10 py-6 text-xs font-black tracking-widest text-gray-400 uppercase hover:text-red-500">Discard</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}