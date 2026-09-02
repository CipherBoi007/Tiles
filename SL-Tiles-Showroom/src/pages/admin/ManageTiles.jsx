import React, { useState } from 'react';
import { useTileCategories } from '../../hooks/useDataFetch';
import ImageUpload from '../../components/admin/ImageUpload';
import FormInput from '../../components/admin/FormInput';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';

const ManageTiles = () => {
  const { data: collections, pagination, setPage, search, setSearch, createItem, updateItem, deleteItem } = useTileCategories(8);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      alert("Name and Image are required.");
      return;
    }
    
    if (isEditing) {
      await updateItem(isEditing, formData);
      setIsEditing(null);
    } else {
      await createItem(formData);
    }
    
    // Reset form
    setFormData({ name: '', image: '' });
  };

  const handleEdit = (cat) => {
    setFormData({
      name: cat.name,
      image: cat.image
    });
    setIsEditing(cat.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteItem(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ name: '', image: '' });
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage Collections</h1>
        <p className="text-brand-textMuted">Create and manage curated tile collections for your showroom.</p>
      </div>

      {/* Form Section */}
      <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2 mb-6">
          <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
          {isEditing ? 'Edit Collection' : 'Create New Collection'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ImageUpload 
                value={formData.image} 
                onChange={(img) => setFormData({...formData, image: img})} 
                label="Collection Cover Image *"
              />
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <FormInput 
                label="Collection Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Royal Villa Series"
                required
              />

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-brand-gold text-brand-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-brand-gold/20 font-medium"
                >
                  {isEditing ? 'Update Collection' : <><Plus size={18} /> Create Collection</>}
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
            Existing Collections
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search collections..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:border-brand-gold transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(Array.isArray(collections) ? collections : []).map(cat => (
            <div key={cat.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-luxury font-semibold text-brand-text text-lg mb-4">{cat.name}</h3>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button 
                    onClick={() => handleEdit(cat)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand-text hover:text-brand-gold bg-gray-50 hover:bg-[#FFF8E7] rounded-lg transition-colors"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cat.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(Array.isArray(collections) ? collections : []).length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
              No collections found. Create one above!
            </div>
          )}
        </div>

        {(Array.isArray(collections) ? collections : []).length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>
    </div>
  );
};

export default ManageTiles;
