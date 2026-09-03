import React, { useState } from 'react';
import { useSubCategories, useCategories } from '../../hooks/useDataFetch';
import ImageUpload from '../../components/admin/ImageUpload';
import FormInput from '../../components/admin/FormInput';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';
import Drawer from '../../components/admin/Drawer';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';
import FilterDropdown from '../../components/admin/FilterDropdown';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ManageSubCategories = () => {
  const { data: subCategories, pagination, setPage, search, setSearch, filter, setFilter, createItem, updateItem, deleteItem } = useSubCategories(8);
  const { data: categories } = useCategories(100);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    categoryId: ''
  });

  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);
  const categoryFilterOptions = categoryList.map(cat => ({ label: cat.name, value: String(cat.id) }));

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', image: '', categoryId: '' });
    setIsDrawerOpen(true);
  };

  const handleEdit = (sub) => {
    setEditingId(sub.id);
    setFormData({
      name: sub.name || '',
      image: sub.image || '',
      categoryId: sub.categoryId ? String(sub.categoryId) : ''
    });
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.categoryId) {
      alert("Name and Parent Category are required.");
      return;
    }

    const payload = {
      ...formData,
      categoryId: parseInt(formData.categoryId, 10)
    };
    
    if (editingId) {
      await updateItem(editingId, payload);
    } else {
      await createItem(payload);
    }
    
    setIsDrawerOpen(false);
    setFormData({ name: '', image: '', categoryId: '' });
  };

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage SubCategories</h1>
          <p className="text-brand-textMuted text-sm">Second-tier groupings linked directly to a primary category.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-gold text-white px-5 py-2.5 rounded-xl hover:bg-yellow-600 transition-all shadow-md shadow-brand-gold/20 font-medium text-sm self-start md:self-auto shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add SubCategory
        </button>
      </div>

      {/* List Section Header & Search */}
      <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
            Existing SubCategories ({pagination.totalItems || (Array.isArray(subCategories) ? subCategories.length : 0)})
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Custom Luxury Filter Dropdown (Left to Search) */}
            <FilterDropdown 
              options={categoryFilterOptions}
              value={filter.key === 'categoryId' ? String(filter.value) : ''}
              onChange={(val) => {
                if (val) {
                  setFilter({ key: 'categoryId', value: val });
                } else {
                  setFilter({ key: '', value: '' });
                }
              }}
              placeholder="All Categories"
            />

            {/* Search Input */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search subcategories..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl w-full sm:w-60 focus:outline-none focus:border-brand-gold transition-colors text-xs font-medium text-brand-text bg-white"
              />
            </div>
          </div>
        </div>
        
        {/* SubCategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(Array.isArray(subCategories) ? subCategories : []).map(sub => (
            <div key={sub.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={sub.image} alt={sub.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-luxury font-semibold text-brand-text text-lg leading-snug">{sub.name}</h3>
                    <span className="bg-gray-100 text-brand-text text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                      {sub.tilesCount || 0} Tiles
                    </span>
                  </div>
                  {sub.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-[#FFF8E7] text-[#8c7028] text-xs font-medium px-2.5 py-1 rounded-md border border-brand-gold/20">
                        {sub.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button 
                    onClick={() => handleEdit(sub)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand-text hover:text-brand-gold bg-gray-50 hover:bg-[#FFF8E7] rounded-lg transition-colors"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => setDeleteTargetId(sub.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(Array.isArray(subCategories) ? subCategories : []).length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
              No subcategories found. Click "+ Add SubCategory" above to create one!
            </div>
          )}
        </div>

        {(Array.isArray(subCategories) ? subCategories : []).length > 0 && (
          <div className="mt-6">
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* Right Slide-over Drawer for Add / Edit */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={editingId ? 'Edit SubCategory' : 'Create New SubCategory'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload 
            value={formData.image} 
            onChange={(img) => setFormData({...formData, image: img})} 
            label="SubCategory Cover Image"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="SubCategory Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Glazed Vitrified (GVT)"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Parent Category <span className="text-red-500">*</span></label>
              <select 
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all text-sm font-medium text-brand-text"
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                required
              >
                <option value="">Select Parent Category</option>
                {categoryList.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-auto">
            <button 
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-brand-text hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-brand-gold text-white px-6 py-2.5 rounded-xl hover:bg-yellow-600 transition-colors shadow-md shadow-brand-gold/20 font-medium text-sm"
            >
              {editingId ? 'Save Changes' : 'Create SubCategory'}
            </button>
          </div>
        </form>
      </Drawer>

      {/* Luxury Confirmation Modal */}
      <ConfirmModal 
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete SubCategory?"
        message="Are you sure you want to delete this subcategory? All tile products inside it will also be permanently deleted."
        confirmText="Delete SubCategory"
        type="danger"
      />
    </div>
  );
};

export default ManageSubCategories;
