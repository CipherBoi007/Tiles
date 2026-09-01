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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSubCategorySelect = (sub) => {
    setSelectedSubCategory(sub);
    setFilter({ key: 'subCategoryId', value: sub.id.toString() });
    setViewMode('tiles');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearch('');
    setFilter({ key: '', value: '' });
    setViewMode('categories');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSwitchView = (mode) => {
    setViewMode(mode);
    if (mode === 'categories') {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setFilter({ key: '', value: '' });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
              <h1 className="text-3xl md:text-4xl font-semibold font-luxury text-brand-black mb-2">
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

            {/* View switcher tabs */}
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 sm:gap-2 bg-brand-lightBg p-1 sm:p-1.5 rounded-xl border border-gray-200 min-w-max md:min-w-0">
                <button
                  onClick={() => handleSwitchView('categories')}
                  className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-1 md:flex-initial ${
                    viewMode === 'categories'
                      ? 'bg-brand-white text-brand-gold shadow-sm font-semibold'
                      : 'text-brand-textMuted hover:text-brand-black'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 shrink-0" />
                  <span>Categories</span>
                </button>

                <button
                  onClick={() => handleSwitchView('subcategories')}
                  className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-1 md:flex-initial ${
                    viewMode === 'subcategories'
                      ? 'bg-brand-white text-brand-gold shadow-sm font-semibold'
                      : 'text-brand-textMuted hover:text-brand-black'
                  }`}
                >
                  <FolderTree className="w-4 h-4 shrink-0" />
                  <span>SubCategories</span>
                </button>

                <button
                  onClick={() => handleSwitchView('tiles')}
                  className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-1 md:flex-initial ${
                    viewMode === 'tiles'
                      ? 'bg-brand-white text-brand-gold shadow-sm font-semibold'
                      : 'text-brand-textMuted hover:text-brand-black'
                  }`}
                >
                  <Grid className="w-4 h-4 shrink-0" />
                  <span>All Tiles</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* LEVEL 1: CATEGORIES VIEW */}
          {viewMode === 'categories' && (
            <section>
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {categoryList.map((cat) => (
                  <StaggerItem key={cat.id}>
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer bg-brand-black border border-gray-200/80 hover:border-brand-gold shadow-sm hover:shadow-xl hover:shadow-brand-gold/15 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end h-[200px] sm:h-[280px]"
                    >
                      {/* Background Image & Multi-stop Luxury Gradient */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <SafeImage 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/65 to-black/15 group-hover:via-brand-black/50 transition-colors duration-300"></div>
                      </div>
                      
                      {/* Bottom Content Area - Title Only */}
                      <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-end text-brand-white">
                        <h3 className="text-base sm:text-2xl font-luxury font-bold text-white group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                          {cat.name}
                        </h3>
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
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredSubCategories.map((sub) => (
                  <StaggerItem key={sub.id}>
                    <div 
                      onClick={() => handleSubCategorySelect(sub)}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer bg-brand-black border border-gray-200/80 hover:border-brand-gold shadow-sm hover:shadow-xl hover:shadow-brand-gold/15 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end h-[200px] sm:h-[280px]"
                    >
                      {/* Background Image & Multi-stop Luxury Gradient */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <SafeImage 
                          src={sub.image} 
                          alt={sub.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/65 to-black/15 group-hover:via-brand-black/50 transition-colors duration-300"></div>
                      </div>
                      
                      {/* Bottom Content Area - Title Only */}
                      <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-end text-brand-white">
                        <h3 className="text-base sm:text-2xl font-luxury font-bold text-white group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                          {sub.name}
                        </h3>
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
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
