import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Download, Trash2, Link, Search, Plus, Eye, Check } from 'lucide-react';
import { useCatalogues } from '../../hooks/useDataFetch';
import { uploadFile } from '../../services/uploadService';
import Pagination from '../../components/Pagination';
import Drawer from '../../components/admin/Drawer';
import FormInput from '../../components/admin/FormInput';

const Catalogues = () => {
  const { data: catalogues, pagination, setPage, search, setSearch, createItem, deleteItem, loading } = useCatalogues(30);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const handleOpenAdd = () => {
    setTitle('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsDrawerOpen(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim() || !file) {
      alert("Catalogue Title and PDF file are required.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload PDF file to server
      const fileUrl = await uploadFile(file);
      
      // 2. Create Catalogue database entry (auto-refetches list without page reload)
      await createItem({ 
        title: title.trim(), 
        fileUrl 
      });

      // 3. Reset state & close slide-over drawer
      setTitle('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsDrawerOpen(false);
    } catch (err) {
      alert("Failed to upload catalogue: " + (err.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this catalogue?")) {
      await deleteItem(id);
    }
  };

  const handleCopyLink = (catalogue) => {
    const fullUrl = window.location.origin + catalogue.fileUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(catalogue.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const catalogueList = Array.isArray(catalogues) ? catalogues : [];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage Catalogues</h1>
          <p className="text-brand-textMuted text-sm">Upload and manage digital PDF catalogues for showroom visitors.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-gold text-white px-5 py-2.5 rounded-xl hover:bg-yellow-600 transition-all shadow-md shadow-brand-gold/20 font-medium text-sm self-start md:self-auto shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add New Catalogue
        </button>
      </div>

      {/* Main Published Catalogues List Card */}
      <div className="bg-brand-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card Toolbar */}
        <div className="p-6 border-b border-gray-100 bg-brand-lightBg/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-luxury font-bold text-brand-text flex items-center gap-2">
              <span className="w-1.5 h-5 bg-brand-gold rounded-full"></span>
              Published Catalogues
            </h2>
            <span className="bg-[#FFF8E7] text-[#8c7028] text-xs font-bold px-3 py-1 rounded-full border border-brand-gold/20">
              {pagination.totalItems || catalogueList.length} Files
            </span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search catalogues..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl w-full sm:w-64 focus:outline-none focus:border-brand-gold transition-colors text-xs font-medium text-brand-text bg-white"
            />
          </div>
        </div>
        
        {/* Table / List View */}
        {loading ? (
          <div className="p-12 text-center text-brand-textMuted font-medium text-sm">
            Loading catalogues...
          </div>
        ) : catalogueList.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {catalogueList.map((catalogue) => (
              <div key={catalogue.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-brand-lightBg/40 transition-colors group">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
                    <FileText size={22} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold font-luxury text-brand-text text-base mb-1 truncate">
                      {catalogue.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                      <span>
                        {catalogue.date ? new Date(catalogue.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently uploaded'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-brand-gold font-mono text-[11px] truncate max-w-[240px] sm:max-w-xs">
                        {catalogue.fileUrl}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={catalogue.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-brand-text hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                    title="Preview PDF"
                  >
                    <Eye size={16} />
                  </a>
                  <button 
                    onClick={() => handleCopyLink(catalogue)}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-brand-text hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer" 
                    title="Copy File Link"
                  >
                    {copiedId === catalogue.id ? <Check size={16} className="text-green-600" /> : <Link size={16} />}
                  </button>
                  <a 
                    href={catalogue.fileUrl} 
                    download 
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-[#FFF8E7] transition-colors cursor-pointer" 
                    title="Download PDF"
                  >
                    <Download size={16} />
                  </a>
                  <button 
                    onClick={() => handleDelete(catalogue.id)} 
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer" 
                    title="Delete Catalogue"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-brand-textMuted bg-brand-white rounded-2xl">
            No catalogues found. Click <span className="font-semibold text-brand-gold">"+ Add New Catalogue"</span> above to upload your first PDF!
          </div>
        )}

        {catalogueList.length > 0 && (
          <div className="border-t border-gray-100 p-4">
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* Right Slide-over Drawer for Uploading Catalogue */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => !isUploading && setIsDrawerOpen(false)} 
        title="Upload New Catalogue"
      >
        <form onSubmit={handleUpload} className="space-y-6">
          {/* PDF Drag and Drop Area */}
          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">Catalogue PDF File <span className="text-red-500">*</span></label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                file 
                  ? 'border-brand-gold bg-[#FFF8E7]/50' 
                  : 'border-gray-200 hover:border-brand-gold/50 bg-gray-50/50 hover:bg-[#FFF8E7]/30'
              }`}
            >
              <div className="w-14 h-14 bg-brand-white rounded-2xl shadow-sm flex items-center justify-center mb-3 text-brand-gold border border-gray-100">
                <UploadCloud size={28} />
              </div>

              {file ? (
                <div>
                  <p className="font-luxury font-bold text-brand-text text-sm mb-1">{file.name}</p>
                  <p className="text-xs text-brand-gold font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB PDF Selected</p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-brand-text text-sm mb-1">Click to select PDF document</p>
                  <p className="text-xs text-brand-textMuted">or drag & drop file here</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-2">Maximum file size: 50MB</p>
                </div>
              )}

              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const selected = e.target.files[0];
                    setFile(selected);
                    if (!title) {
                      const cleanName = selected.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                      setTitle(cleanName);
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Title Input */}
          <FormInput 
            label="Catalogue Title *" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 12X24 Elevation Collection 2025"
            required
          />

          {/* Modal Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-auto">
            <button 
              type="button"
              disabled={isUploading}
              onClick={() => setIsDrawerOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-brand-text hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isUploading || !file || !title.trim()}
              className="bg-brand-gold text-white px-6 py-2.5 rounded-xl hover:bg-yellow-600 transition-colors shadow-md shadow-brand-gold/20 font-medium text-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading PDF...
                </>
              ) : (
                'Upload & Publish Catalogue'
              )}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Catalogues;

