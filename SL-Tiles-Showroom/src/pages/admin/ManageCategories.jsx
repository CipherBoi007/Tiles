import React, { useState } from 'react';
import { useCategories } from '../../hooks/useDataFetch';
import ImageUpload from '../../components/admin/ImageUpload';
import FormInput from '../../components/admin/FormInput';
import { Edit2, Trash2, Plus, Search, FolderOpen } from 'lucide-react';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';

const ManageCategories = () => {
  const { data: categories, pagination, setPage, search, setSearch, createItem, updateItem, deleteItem } = useCategories(8);
  
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
    status: 'active'
  });
  const [isEditing, setIsEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Category name is required.");
      return;
    }
    
    if (isEditing) {
      await updateItem(isEditing, formData);
      setIsEditing(null);
    } else {
      await createItem(formData);
    }
    
    // Reset form
    setFormData({ name: '', desc: '', image: '', status: 'active' });
  };

  const handleEdit = (cat) => {
    setFormData({
      name: cat.name || '',
      desc: cat.desc || '',
      image: cat.image || '',
      status: cat.status || 'active'
    });
    setIsEditing(cat.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? All its subcategories and tiles will also be deleted.")) {
      await deleteItem(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ name: '', desc: '', image: '', status: 'active' });
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage Categories</h1>
        <p className="text-brand-textMuted">Top-level tile categories (e.g., Floor Tiles, Wall Tiles, Natural Stone).</p>
      </div>

      {/* Form Section */}
      <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2 mb-6">
          <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
          {isEditing ? 'Edit Category' : 'Create New Category'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ImageUpload 
                value={formData.image} 
                onChange={(img) => setFormData({...formData, image: img})} 
                label="Category Cover Image"
              />
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput 
                  label="Category Name *" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Floor Tiles"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-brand-text mb-2">Status</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-text"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <FormInput 
                label="Description" 
                type="textarea"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="Brief summary of what this category contains..."
                rows={3}
              />

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-brand-gold text-brand-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg shadow-brand-gold/20 font-medium"
                >
                  {isEditing ? 'Update Category' : <><Plus size={18} /> Create Category</>}
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
            Existing Categories
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:border-brand-gold transition-colors text-sm"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(Array.isArray(categories) ? categories : []).map(cat => (
            <div key={cat.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {cat.subCategoriesCount || 0} SubCategories
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-luxury font-semibold text-brand-text text-lg mb-1">{cat.name}</h3>
                <p className="text-sm text-brand-textMuted line-clamp-2 mb-4 flex-1">
                  {cat.desc || 'No description provided.'}
                </p>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
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
          {(Array.isArray(categories) ? categories : []).length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
              No categories found. Create one above!
            </div>
          )}
        </div>

        {(Array.isArray(categories) ? categories : []).length > 0 && (
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

export default ManageCategories;
