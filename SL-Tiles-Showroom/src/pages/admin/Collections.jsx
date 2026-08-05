import React, { useState } from 'react';
import { useCollections } from '../../hooks/useDataFetch';
import { useData } from '../../context/DataContext';
import ImageUpload from '../../components/admin/ImageUpload';
import FormInput from '../../components/admin/FormInput';
import { Edit2, Trash2, Plus, Eye, LayoutTemplate, Search } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';

// Mock templates for selection
const templates = [
  { id: 'template1', name: 'Standard Grid', icon: '⊞' },
  { id: 'template2', name: 'Feature Layout', icon: '◩' },
  { id: 'template3', name: 'Showcase View', icon: '◻' }
];

const Collections = () => {
  const { collections: globalCollections } = useData();
  const { data: tiles, pagination, setPage, search, setSearch, createItem, updateItem, deleteItem } = useCollections(12);
  
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    size: '',
    palette: '',
    template: 'template1',
    collectionId: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(null);
  const [previewTile, setPreviewTile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      alert("Name and Image are required.");
      return;
    }
    
    const payload = {
      ...formData,
      collectionId: formData.collectionId ? parseInt(formData.collectionId, 10) : null
    };

    if (isEditing) {
      await updateItem(isEditing, payload);
      setIsEditing(null);
    } else {
      await createItem(payload);
    }
    
    // Reset form
    setFormData({
      name: '', desc: '', size: '', palette: '', template: 'template1', collectionId: '', image: ''
    });
  };

  const handleEdit = (tile) => {
    setFormData({
      name: tile.name || '',
      desc: tile.desc || '',
      size: tile.size || '',
      palette: tile.palette || '',
      template: tile.template || 'template1',
      collectionId: tile.collectionId || '',
      image: tile.image || ''
    });
    setIsEditing(tile.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteItem(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({
      name: '', desc: '', size: '', palette: '', template: 'template1', collectionId: '', image: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage Tile Products</h1>
        <p className="text-brand-textMuted">Create and manage your actual tile products.</p>
      </div>

      {/* Form Section */}
      <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2 mb-6">
          <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
          {isEditing ? 'Edit Product' : 'Create New Product'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <ImageUpload 
                value={formData.image} 
                onChange={(img) => setFormData({...formData, image: img})} 
                label="Product Image *"
              />
              
              {/* Template Selector Section */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-sm font-medium text-brand-text flex items-center gap-2 mb-3">
                  <LayoutTemplate size={16} /> View Template
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {templates.map(tpl => (
                    <div 
                      key={tpl.id}
                      onClick={() => setFormData({...formData, template: tpl.id})}
                      className={`cursor-pointer flex flex-col items-center p-3 rounded-lg border-2 transition-all text-center
                        ${formData.template === tpl.id 
                          ? 'border-brand-gold bg-white shadow-sm' 
                          : 'border-transparent hover:border-gray-200 hover:bg-white'}`}
                    >
                      <span className={`text-2xl mb-1 ${formData.template === tpl.id ? 'text-brand-gold' : 'text-gray-400'}`}>{tpl.icon}</span>
                      <span className="text-[10px] font-medium leading-tight">{tpl.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div className="md:col-span-1">
                  <FormInput 
                    label="Tile Name *" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Onyx Black"
                    required
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-brand-text mb-2">Category *</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-text mb-4"
                    value={formData.collectionId}
                    onChange={(e) => setFormData({...formData, collectionId: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {(Array.isArray(globalCollections) ? globalCollections : []).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <FormInput 
                  label="Dimensions" 
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  placeholder="e.g. 600x600 mm"
                />

                <FormInput 
                  label="Color Palette" 
                  value={formData.palette}
                  onChange={(e) => setFormData({...formData, palette: e.target.value})}
                  placeholder="e.g. Black, Gold, White"
                />
                
                <div className="md:col-span-2">
                  <FormInput 
                    label="Description" 
                    type="textarea"
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                    placeholder="Brief description of this tile..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-brand-gold text-brand-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-brand-gold/20 font-medium"
                >
                  {isEditing ? 'Update Product' : <><Plus size={18} /> Create Product</>}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-brand-text hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-black rounded-full"></span>
            Created Products
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:border-brand-gold transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(Array.isArray(tiles) ? tiles : []).map(tile => (
            <div key={tile.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={tile.image} alt={tile.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {tile.template && (
                  <div className="absolute bottom-3 left-3 bg-brand-black/80 backdrop-blur text-xs font-medium px-2 py-1 rounded text-white border border-white/10">
                    {templates.find(t => t.id === tile.template)?.name || tile.template}
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-luxury font-semibold text-brand-text text-lg mb-2">{tile.name}</h3>
                
                <div className="flex flex-col gap-y-2 text-sm text-brand-textMuted mb-4">
                  <div><span className="font-medium text-gray-500">Size:</span> {tile.size || 'N/A'}</div>
                  <div className="truncate"><span className="font-medium text-gray-500">Colors:</span> {tile.palette || 'N/A'}</div>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(tile)}
                    className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-brand-text hover:text-brand-gold bg-gray-50 hover:bg-[#FFF8E7] rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setPreviewTile(tile)}
                    className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-brand-text hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Preview Template"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(tile.id)}
                    className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(Array.isArray(tiles) ? tiles : []).length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
              No products found. Create one above!
            </div>
          )}
        </div>

        {(Array.isArray(tiles) ? tiles : []).length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>

      <Modal isOpen={!!previewTile} onClose={() => setPreviewTile(null)} title="Product Preview">
        {previewTile && (
          <div className="flex flex-col md:flex-row gap-6">
            <SafeImage src={previewTile.image} alt="Preview" className="w-full md:w-1/2 aspect-square object-cover rounded-xl" />
            <div>
              <h2 className="text-2xl font-luxury font-bold text-brand-text mb-4">{previewTile.name}</h2>
              <p className="text-brand-textMuted mb-6">{previewTile.desc || 'No description'}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="font-medium">{previewTile.size || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Color Palette</span>
                  <span className="font-medium">{previewTile.palette || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Selected Template</span>
                  <span className="font-medium text-brand-gold">{templates.find(t => t.id === previewTile.template)?.name || previewTile.template}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Collections;
