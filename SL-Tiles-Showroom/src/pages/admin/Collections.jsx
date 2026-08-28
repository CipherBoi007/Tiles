import React, { useState, useEffect, useRef } from 'react';
import { useTiles, useSubCategories, useCategories } from '../../hooks/useDataFetch';
import ImageUpload from '../../components/admin/ImageUpload';
import FormInput from '../../components/admin/FormInput';
import { Edit2, Trash2, Plus, Eye, Search, CheckCircle2, ChevronDown, FolderOpen } from 'lucide-react';
import Drawer from '../../components/admin/Drawer';
import Modal from '../../components/admin/Modal';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';

const Collections = () => {
  const { data: tiles, pagination, setPage, search, setSearch, createItem, updateItem, deleteItem } = useTiles(12);
  const { data: subCategories } = useSubCategories(100);
  const { data: categories } = useCategories(100);

  const subCategoryList = Array.isArray(subCategories) ? subCategories : (subCategories?.data || []);
  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);

  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewTile, setPreviewTile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    subCategoryId: '',
    desc: '',
    size: '',
    finish: '',
    palette: '',
    thickness: '',
    image: ''
  });

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const selectRef = useRef(null);

  // Find selected subcategory object & its parent category
  const selectedSubCategoryObj = subCategoryList.find(s => s.id === parseInt(formData.subCategoryId, 10));
  const autoCategoryName = selectedSubCategoryObj?.category?.name || 
    categoryList.find(c => c.id === selectedSubCategoryObj?.categoryId)?.name;

  // Close custom dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '', subCategoryId: '', desc: '', size: '', finish: '', palette: '', thickness: '', image: ''
    });
    setDropdownSearch('');
    setIsFormDrawerOpen(true);
  };

  const handleEdit = (tile) => {
    setEditingId(tile.id);
    setFormData({
      name: tile.name || '',
      subCategoryId: tile.subCategoryId ? String(tile.subCategoryId) : '',
      desc: tile.desc || '',
      size: tile.size || '',
      finish: tile.finish || '',
      palette: tile.palette || '',
      thickness: tile.thickness || '',
      image: tile.image || ''
    });
    setDropdownSearch('');
    setIsFormDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image || !formData.subCategoryId) {
      alert("Name, SubCategory, and Image are required.");
      return;
    }
    
    const payload = {
      name: formData.name,
      image: formData.image,
      subCategoryId: parseInt(formData.subCategoryId, 10),
      size: formData.size,
      finish: formData.finish || formData.palette || 'Glossy',
      palette: formData.palette,
      thickness: formData.thickness,
      desc: formData.desc
    };

    if (editingId) {
      await updateItem(editingId, payload);
    } else {
      await createItem(payload);
    }
    
    setIsFormDrawerOpen(false);
    setFormData({
      name: '', subCategoryId: '', desc: '', size: '', finish: '', palette: '', thickness: '', image: ''
    });
    setDropdownSearch('');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteItem(id);
    }
  };

  // Filter dropdown items by search
  const filteredSubList = dropdownSearch.trim()
    ? subCategoryList.filter(s => s.name.toLowerCase().includes(dropdownSearch.toLowerCase()))
    : subCategoryList;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-luxury font-bold text-brand-text">Manage Tile Products</h1>
          <p className="text-brand-textMuted text-sm">Create and manage individual tile products under their respective SubCategories.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-gold text-white px-5 py-2.5 rounded-xl hover:bg-yellow-600 transition-all shadow-md shadow-brand-gold/20 font-medium text-sm self-start md:self-auto shrink-0"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* List Section Header & Search */}
      <div className="bg-brand-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-luxury font-semibold text-brand-text flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-gold rounded-full"></span>
            Created Products ({pagination.totalItems || (Array.isArray(tiles) ? tiles.length : 0)})
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full md:w-64 focus:outline-none focus:border-brand-gold transition-colors text-sm"
            />
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(Array.isArray(tiles) ? tiles : []).map(tile => (
            <div key={tile.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={tile.image} alt={tile.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {tile.subCategory && (
                  <div className="absolute top-3 left-3 bg-brand-black/80 backdrop-blur text-[11px] font-medium px-2 py-1 rounded text-white border border-white/10">
                    {tile.subCategory.name}
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-luxury font-semibold text-brand-text text-lg mb-2">{tile.name}</h3>
                
                <div className="flex flex-col gap-y-1 text-xs text-brand-textMuted mb-4">
                  <div><span className="font-medium text-gray-500">SubCategory:</span> {tile.subCategory?.name || 'N/A'}</div>
                  <div><span className="font-medium text-gray-500">Category:</span> {tile.subCategory?.category?.name || 'N/A'}</div>
                  <div><span className="font-medium text-gray-500">Size:</span> {tile.size || 'N/A'}</div>
                  <div><span className="font-medium text-gray-500">Finish:</span> {tile.finish || 'N/A'}</div>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(tile)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-brand-text hover:text-brand-gold bg-gray-50 hover:bg-[#FFF8E7] rounded-lg transition-colors"
                  >
                    <Edit2 size={15} /> Edit
                  </button>
                  <button 
                    onClick={() => setPreviewTile(tile)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-brand-text hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Quick Preview"
                  >
                    <Eye size={15} /> Preview
                  </button>
                  <button 
                    onClick={() => handleDelete(tile.id)}
                    className="p-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(Array.isArray(tiles) ? tiles : []).length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
              No products found. Click "+ Add New Product" above to create one!
            </div>
          )}
        </div>

        {(Array.isArray(tiles) ? tiles : []).length > 0 && (
          <div className="mt-6">
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* Right Slide-over Drawer for Add / Edit Tile Product */}
      <Drawer 
        isOpen={isFormDrawerOpen} 
        onClose={() => setIsFormDrawerOpen(false)} 
        title={editingId ? 'Edit Product' : 'Create New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload 
            value={formData.image} 
            onChange={(img) => setFormData({...formData, image: img})} 
            label="Product Image *"
          />

          <FormInput 
            label="Tile Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Carrara White Marble"
            required
          />

          {/* Custom Searchable SubCategory Dropdown inside Drawer */}
          <div className="relative" ref={selectRef}>
            <label className="block text-sm font-medium text-brand-text mb-2">SubCategory <span className="text-red-500">*</span></label>
            
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all text-brand-text flex items-center justify-between cursor-pointer select-none text-sm font-medium"
            >
              <span className={selectedSubCategoryObj ? "text-brand-text font-medium" : "text-gray-400"}>
                {selectedSubCategoryObj ? selectedSubCategoryObj.name : "Select SubCategory..."}
              </span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 max-h-64 flex flex-col">
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      placeholder="Type to filter subcategories..."
                      className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-brand-gold"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-1 space-y-3">
                  {categoryList.map(cat => {
                    const catSubs = filteredSubList.filter(s => s.categoryId === cat.id);
                    if (catSubs.length === 0) return null;
                    return (
                      <div key={cat.id}>
                        <div className="px-2 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                          <FolderOpen size={12} className="text-brand-gold" /> {cat.name}
                        </div>
                        <div className="space-y-0.5 mt-1">
                          {catSubs.map(sub => (
                            <div
                              key={sub.id}
                              onClick={() => {
                                setFormData({ ...formData, subCategoryId: String(sub.id) });
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-between ${
                                String(sub.id) === formData.subCategoryId 
                                  ? 'bg-brand-gold/15 text-brand-gold font-bold' 
                                  : 'hover:bg-gray-50 text-brand-text'
                              }`}
                            >
                              <span>{sub.name}</span>
                              {String(sub.id) === formData.subCategoryId && <CheckCircle2 size={14} className="text-brand-gold" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {autoCategoryName && (
              <div className="mt-2 flex items-center gap-2 text-xs text-brand-gold font-medium bg-[#FFF8E7] border border-brand-gold/20 px-3 py-2 rounded-lg">
                <CheckCircle2 size={14} className="text-brand-gold shrink-0" />
                <span>Parent Category: <strong className="font-semibold text-brand-black">{autoCategoryName}</strong> (Auto-associated)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="Dimensions" 
              value={formData.size}
              onChange={(e) => setFormData({...formData, size: e.target.value})}
              placeholder="e.g. 600x600 mm"
            />

            <FormInput 
              label="Finish" 
              value={formData.finish}
              onChange={(e) => setFormData({...formData, finish: e.target.value})}
              placeholder="e.g. High Gloss, Matte, Satin"
            />

            <FormInput 
              label="Color Palette" 
              value={formData.palette}
              onChange={(e) => setFormData({...formData, palette: e.target.value})}
              placeholder="e.g. White, Gray, Gold"
            />

            <FormInput 
              label="Thickness" 
              value={formData.thickness}
              onChange={(e) => setFormData({...formData, thickness: e.target.value})}
              placeholder="e.g. 9mm"
            />
          </div>

          <FormInput 
            label="Description" 
            type="textarea"
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            placeholder="Brief description of this tile product..."
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-auto">
            <button 
              type="button"
              onClick={() => setIsFormDrawerOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-brand-text hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-brand-gold text-white px-6 py-2.5 rounded-xl hover:bg-yellow-600 transition-colors shadow-md shadow-brand-gold/20 font-medium text-sm"
            >
              {editingId ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </Drawer>

      {/* Modal Dialog for Preview */}
      <Modal isOpen={!!previewTile} onClose={() => setPreviewTile(null)} title="Product Preview">
        {previewTile && (
          <div className="flex flex-col md:flex-row gap-6">
            <SafeImage src={previewTile.image} alt="Preview" className="w-full md:w-1/2 aspect-square object-cover rounded-xl" />
            <div>
              <h2 className="text-2xl font-luxury font-bold text-brand-text mb-4">{previewTile.name}</h2>
              <p className="text-brand-textMuted mb-6 text-sm">{previewTile.desc || 'No description'}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">SubCategory</span>
                  <span className="font-medium text-brand-black">{previewTile.subCategory?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-brand-gold">{previewTile.subCategory?.category?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="font-medium">{previewTile.size || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Finish</span>
                  <span className="font-medium">{previewTile.finish || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Color Palette</span>
                  <span className="font-medium">{previewTile.palette || 'N/A'}</span>
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
