import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Download, Trash2, Link, Search } from 'lucide-react';
import { useCatalogues } from '../../hooks/useDataFetch';
import { uploadFile } from '../../services/uploadService';
import Pagination from '../../components/Pagination';

const Catalogues = () => {
  const { data: catalogues, pagination, setPage, search, setSearch, createItem, deleteItem, loading } = useCatalogues(6);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!title || !file) return alert("Title and PDF file are required.");
    setIsUploading(true);
    try {
      const base64Url = await uploadFile(file);
      await createItem({ title, desc, fileUrl: base64Url });
      setTitle('');
      setDesc('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      alert("Failed to upload catalogue: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this catalogue?")) {
      await deleteItem(id);
    }
  };

  if (loading) return <div className="p-8 text-center text-brand-textMuted font-medium">Loading Catalogues...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Catalogues</h1>
        <p className="text-brand-textMuted">Upload and manage showroom PDF catalogues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-sm font-luxury font-bold text-brand-text mb-4">Upload New Catalogue</h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-brand-gold/30 bg-[#FFF8E7] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 cursor-pointer hover:bg-brand-gold/10 transition-colors group relative"
            >
              <div className="w-16 h-16 bg-brand-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-brand-gold w-8 h-8" />
              </div>
              <h3 className="font-semibold text-brand-text mb-1">
                {file ? file.name : "Click to upload"}
              </h3>
              <p className="text-xs text-brand-textMuted mb-2">or drag and drop</p>
              <p className="text-[10px] text-gray-400 font-medium">PDF (MAX. 5MB)</p>
              
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-textMuted mb-2">Catalogue Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Collection 2024" 
                  className="w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all text-brand-text"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-textMuted mb-2">Description</label>
                <textarea 
                  rows="3"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Brief description..." 
                  className="w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all resize-none text-brand-text"
                ></textarea>
              </div>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-brand-gold text-brand-white font-medium py-2.5 rounded-sm hover:bg-yellow-600 transition-colors shadow-md shadow-brand-gold/20 mt-2 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Upload PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-brand-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-brand-lightBg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-luxury font-bold text-brand-text">Published Catalogues</h2>
                <span className="bg-[#FFF8E7] text-[#8c7028] text-xs font-bold px-3 py-1 rounded-full border border-brand-gold/20">
                  {pagination.totalItems} Files
                </span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search catalogues..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg w-full sm:w-48 focus:outline-none focus:border-brand-gold transition-colors text-xs"
                />
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {catalogues.map((catalogue) => (
                <div key={catalogue.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:bg-brand-lightBg/50 transition-colors group">
                  <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-luxury text-brand-text mb-2 truncate">{catalogue.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                      <span>{catalogue.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>PDF Document</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity mt-4 sm:mt-0">
                    <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-brand-text hover:border-gray-400 hover:bg-gray-50 transition-colors" title="Copy Link">
                      <Link size={16} />
                    </button>
                    <a href={catalogue.fileUrl} download className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-[#FFF8E7] transition-colors" title="Download">
                      <Download size={16} />
                    </a>
                    <button onClick={() => handleDelete(catalogue.id)} className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {catalogues.length > 0 && (
              <div className="border-t border-gray-100">
                <Pagination 
                  currentPage={pagination.currentPage} 
                  totalPages={pagination.totalPages} 
                  onPageChange={setPage} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogues;
