import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import SEO from '../../components/SEO';
import ProductCard from '../../components/ProductCard';
import TileModal from '../../components/TileModal';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';
import { useCategories, useSubCategories, useTiles } from '../../hooks/useDataFetch';
import { FadeUp, StaggerContainer, StaggerItem } from '../../components/animations/MotionWrappers';
import { ArrowRight, Filter, X, Search, Layers, Grid, ArrowLeft, FolderOpen, FolderTree } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PublicCollections = () => {
  const { data: categories } = useCategories(100);
  const { data: subCategories } = useSubCategories(100);
  const { data: tiles, pagination, setPage, search, setSearch, setFilter, loading: tilesLoading } = useTiles(12);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [viewMode, setViewMode] = useState('categories'); // 'categories' | 'subcategories' | 'tiles'
  
  const location = useLocation();
  const navigate = useNavigate();

  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);
  const subCategoryList = Array.isArray(subCategories) ? subCategories : (subCategories?.data || []);

  // Filter subcategories by active category selection
  const filteredSubCategories = selectedCategory
    ? subCategoryList.filter(sc => sc.categoryId === selectedCategory.id)
    : subCategoryList;

  // Read URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const viewParam = params.get('view');
    const catIdParam = params.get('categoryId');
    const subIdParam = params.get('subCategoryId');
    const searchQuery = params.get('search');
    
    if (subIdParam) {
      const foundSub = subCategoryList.find(s => s.id === Number(subIdParam));
      if (foundSub) {
        setSelectedSubCategory(foundSub);
        setFilter({ key: 'subCategoryId', value: subIdParam });
        setViewMode('tiles');
      }
    } else if (catIdParam) {
      const foundCat = categoryList.find(c => c.id === Number(catIdParam));
      if (foundCat) {
        setSelectedCategory(foundCat);
        setViewMode('subcategories');
      }
    } else if (viewParam === 'tiles') {
      setViewMode('tiles');
    }

    if (searchQuery) {
      setSearch(searchQuery);
      setViewMode('tiles');
    }
  }, [location.search, categoryList, subCategoryList, setFilter, setSearch]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setViewMode('subcategories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubCategorySelect = (sub) => {
    setSelectedSubCategory(sub);
    setFilter({ key: 'subCategoryId', value: sub.id.toString() });
    setViewMode('tiles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearch('');
    setFilter({ key: '', value: '' });
    setViewMode('categories');
  };

  const handleSwitchView = (mode) => {
    setViewMode(mode);
    if (mode === 'categories') {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setFilter({ key: '', value: '' });
    }
  };

  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Tile Categories & Products Showcase | SRI LAKSHMI TILES" 
        description="Explore luxury floor tiles, wall tiles, natural stone slabs, and exterior paver collections."
      />
      <Header />
      
      <main className="flex-1 pt-0 pb-16">
        {/* Banner Header */}
        <div className="bg-brand-white border-b border-gray-100 py-6 mb-8 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-luxury text-brand-black mb-2">
                {viewMode === 'categories' && 'Tile Categories'}
                {viewMode === 'subcategories' && (selectedCategory ? selectedCategory.name : 'SubCategories')}
                {viewMode === 'tiles' && (selectedSubCategory ? `${selectedSubCategory.name} Tiles` : 'All Tile Products')}
              </h1>
              <p className="text-brand-textMuted text-base max-w-2xl">
                {viewMode === 'categories' && 'Select a main category to explore targeted series and collections.'}
                {viewMode === 'subcategories' && 'Choose a subcategory to browse matching tile designs.'}
                {viewMode === 'tiles' && `Showing ${pagination.totalItems || tiles.length} tiles in stock.`}
              </p>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto border border-gray-200">
              <button
                onClick={() => handleSwitchView('categories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  viewMode === 'categories'
                    ? 'bg-brand-gold text-white shadow-md font-bold'
                    : 'text-brand-textMuted hover:text-brand-black'
                }`}
              >
                <FolderOpen size={16} /> Categories
              </button>
              <button
                onClick={() => handleSwitchView('subcategories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  viewMode === 'subcategories'
                    ? 'bg-brand-gold text-white shadow-md font-bold'
                    : 'text-brand-textMuted hover:text-brand-black'
                }`}
              >
                <FolderTree size={16} /> SubCategories
              </button>
              <button
                onClick={() => handleSwitchView('tiles')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  viewMode === 'tiles'
                    ? 'bg-brand-gold text-white shadow-md font-bold'
                    : 'text-brand-textMuted hover:text-brand-black'
                }`}
              >
                <Grid size={16} /> All Tiles
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* LEVEL 1: CATEGORIES VIEW */}
          {viewMode === 'categories' && (
            <section>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryList.map((cat) => (
                  <StaggerItem key={cat.id}>
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer border border-gray-200 hover:border-brand-gold shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <SafeImage 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-5 text-brand-white">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-luxury font-bold text-white group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                          <span className="text-[11px] bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full font-medium text-white">
                            {cat.subCategoriesCount || 0} Subcategories
                          </span>
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-2 mb-3">{cat.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">
                          Explore SubCategories <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* LEVEL 2: SUBCATEGORIES VIEW */}
          {viewMode === 'subcategories' && (
            <section>
              {selectedCategory && (
                <div className="mb-6 flex items-center justify-between bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleSwitchView('categories')}
                      className="p-2 bg-brand-white rounded-xl text-brand-black hover:bg-brand-gold hover:text-white transition-colors shadow-sm"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold font-luxury text-brand-black">Category: {selectedCategory.name}</h3>
                      <p className="text-xs text-brand-textMuted">{selectedCategory.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedCategory(null); setViewMode('subcategories'); }}
                    className="text-xs text-red-500 hover:underline font-medium"
                  >
                    View All SubCategories
                  </button>
                </div>
              )}

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubCategories.map((sub) => (
                  <StaggerItem key={sub.id}>
                    <div 
                      onClick={() => handleSubCategorySelect(sub)}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer border border-gray-200 hover:border-brand-gold shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <SafeImage 
                          src={sub.image} 
                          alt={sub.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-5 text-brand-white">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-luxury font-bold text-white group-hover:text-brand-gold transition-colors">{sub.name}</h3>
                          <span className="text-[11px] bg-brand-gold/80 backdrop-blur px-2.5 py-0.5 rounded-full font-medium text-white">
                            {sub.tilesCount || 0} Tiles
                          </span>
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-2 mb-3">{sub.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">
                          View Tiles <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* LEVEL 3: TILES VIEW */}
          {viewMode === 'tiles' && (
            <section id="all-tiles-section">
              {/* Active Filter Banner */}
              {(selectedSubCategory || selectedCategory) && (
                <div className="mb-6 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setViewMode('subcategories')}
                      className="p-2 bg-brand-white rounded-xl text-brand-black hover:bg-brand-gold hover:text-white transition-colors shadow-sm"
                      title="Back to SubCategories"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold font-luxury text-brand-black">
                        {selectedSubCategory ? `SubCategory: ${selectedSubCategory.name}` : `Category: ${selectedCategory.name}`}
                      </h3>
                      <p className="text-xs text-brand-textMuted">{selectedSubCategory?.desc || selectedCategory?.desc}</p>
                    </div>
                  </div>

                  <button 
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium bg-white px-3 py-1.5 rounded-lg border border-red-200"
                  >
                    <X size={14} /> Clear Filter
                  </button>
                </div>
              )}

              {/* Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tiles by name, size, finish..."
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold text-sm transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Tile Cards Grid */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(Array.isArray(tiles) ? tiles : []).length > 0 ? (
                  tiles.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard 
                        product={product} 
                        onQuickView={setSelectedProduct} 
                      />
                    </StaggerItem>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-lg font-medium mb-1">No tile products found</p>
                    <p className="text-sm text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
                    <button onClick={clearFilters} className="px-4 py-2 bg-brand-gold text-white text-xs rounded-lg font-medium">
                      Reset Filters
                    </button>
                  </div>
                )}
              </StaggerContainer>

              {/* Pagination */}
              {(Array.isArray(tiles) ? tiles : []).length > 0 && (
                <div className="mt-10">
                  <Pagination 
                    currentPage={pagination.currentPage} 
                    totalPages={pagination.totalPages} 
                    onPageChange={setPage} 
                  />
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />

      {selectedProduct && (
        <TileModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default PublicCollections;
