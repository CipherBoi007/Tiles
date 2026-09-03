import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import SEO from '../../components/SEO';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';
import { useCategories, useSubCategories, useTiles } from '../../hooks/useDataFetch';
import { FadeUp, StaggerContainer, StaggerItem } from '../../components/animations/MotionWrappers';
import { ChevronRight, Search, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PublicCollections = () => {
  const { data: categories } = useCategories(100);
  const { data: subCategories } = useSubCategories(100);
  const { data: tiles, pagination, setPage, search, setSearch, setFilter, loading: tilesLoading } = useTiles(12);
  
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
        if (foundSub.categoryId) {
          const parentCat = categoryList.find(c => c.id === foundSub.categoryId);
          if (parentCat) setSelectedCategory(parentCat);
        }
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

  const handleBreadcrumbClick = (targetLevel) => {
    if (targetLevel === 'categories') {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setFilter({ key: '', value: '' });
      setViewMode('categories');
    } else if (targetLevel === 'subcategories') {
      setSelectedSubCategory(null);
      setFilter({ key: '', value: '' });
      setViewMode('subcategories');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Tile Collections & Catalogue | SRI LAKSHMI TILES" 
        description="Explore luxury floor tiles, wall tiles, natural stone slabs, and exterior paver collections."
      />
      <Header />
      
      <main className="flex-1 pt-0 pb-16">
        {/* Simple & Elegant Breadcrumb Navigation Header */}
        <div className="bg-brand-white border-b border-gray-100 py-6 mb-8 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col gap-3">
            {/* Breadcrumb Bar */}
            <nav className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-brand-textMuted">
              <button 
                onClick={() => handleBreadcrumbClick('categories')}
                className={`hover:text-brand-gold transition-colors ${
                  viewMode === 'categories' ? 'text-brand-black font-bold text-base sm:text-lg' : 'text-gray-500'
                }`}
              >
                Categories
              </button>

              {(viewMode === 'subcategories' || viewMode === 'tiles') && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  <button 
                    onClick={() => handleBreadcrumbClick('subcategories')}
                    className={`hover:text-brand-gold transition-colors ${
                      viewMode === 'subcategories' ? 'text-brand-black font-bold text-base sm:text-lg' : 'text-gray-500'
                    }`}
                  >
                    {selectedCategory ? selectedCategory.name : 'SubCategories'}
                  </button>
                </>
              )}

              {viewMode === 'tiles' && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-brand-gold font-bold text-base sm:text-lg">
                    {selectedSubCategory ? selectedSubCategory.name : 'Tiles'}
                  </span>
                </>
              )}
            </nav>

            <p className="text-brand-textMuted text-xs sm:text-sm">
              {viewMode === 'categories' && 'Select a main category to explore targeted subcategories.'}
              {viewMode === 'subcategories' && 'Choose a subcategory to browse available tile designs.'}
              {viewMode === 'tiles' && `Showing ${pagination.totalItems || tiles.length} tile products.`}
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* LEVEL 1: CATEGORIES VIEW (Vertical Column Alternating Stack) */}
          {viewMode === 'categories' && (
            <section>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 items-stretch">
                {categoryList.map((cat, idx) => {
                  const isNameTop = idx % 2 === 0;

                  const NameBox = (
                    <div 
                      key={`cat-name-${cat.id}`}
                      onClick={() => handleCategorySelect(cat)}
                      className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-20 sm:h-24 md:h-28 text-center shrink-0"
                    >
                      <h3 className="text-xs sm:text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                        {cat.name}
                      </h3>
                    </div>
                  );

                  const ImageBox = (
                    <div 
                      key={`cat-img-${cat.id}`}
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[240px] sm:h-[340px] md:h-[400px] flex-1"
                    >
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-brand-black/15 group-hover:bg-brand-black/0 transition-colors duration-300"></div>
                    </div>
                  );

                  return (
                    <StaggerItem key={cat.id} className="flex flex-col gap-3 sm:gap-4 h-full">
                      {isNameTop ? (
                        <>
                          {NameBox}
                          {ImageBox}
                        </>
                      ) : (
                        <>
                          {ImageBox}
                          {NameBox}
                        </>
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </section>
          )}

          {/* LEVEL 2: SUBCATEGORIES VIEW (Vertical Column Alternating Stack with Dynamic Container & Tall Height) */}
          {viewMode === 'subcategories' && (
            <section>
              {/* Dynamic width container based on item count so subcategory cards stay grand & perfectly proportioned */}
              <div className={`mx-auto ${
                filteredSubCategories.length <= 2 
                  ? 'max-w-3xl sm:max-w-4xl' 
                  : filteredSubCategories.length === 3 
                  ? 'max-w-5xl' 
                  : filteredSubCategories.length === 4 
                  ? 'max-w-6xl' 
                  : 'max-w-[1400px]'
              }`}>
                <StaggerContainer className={`grid gap-4 sm:gap-6 items-stretch ${
                  filteredSubCategories.length <= 2 
                    ? 'grid-cols-2' 
                    : filteredSubCategories.length === 3 
                    ? 'grid-cols-2 md:grid-cols-3' 
                    : filteredSubCategories.length === 4 
                    ? 'grid-cols-2 md:grid-cols-4' 
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }`}>
                  {filteredSubCategories.map((sub, idx) => {
                    const isNameTop = idx % 2 === 0;

                    const NameBox = (
                      <div 
                        key={`sub-name-${sub.id}`}
                        onClick={() => handleSubCategorySelect(sub)}
                        className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-brand-white border border-gray-200/80 rounded-2xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-16 sm:h-20 md:h-24 text-center shrink-0"
                      >
                        <h3 className="text-xs sm:text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-snug">
                          {sub.name}
                        </h3>
                      </div>
                    );

                    const ImageBox = (
                      <div 
                        key={`sub-img-${sub.id}`}
                        onClick={() => handleSubCategorySelect(sub)}
                        className="group relative overflow-hidden border border-gray-200/80 rounded-2xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[320px] sm:h-[440px] md:h-[500px] flex-1"
                      >
                        <SafeImage 
                          src={sub.image} 
                          alt={sub.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-brand-black/15 group-hover:bg-brand-black/0 transition-colors duration-300"></div>
                      </div>
                    );

                    return (
                      <StaggerItem key={sub.id} className="flex flex-col gap-3 sm:gap-4 h-full">
                        {isNameTop ? (
                          <>
                            {NameBox}
                            {ImageBox}
                          </>
                        ) : (
                          <>
                            {ImageBox}
                            {NameBox}
                          </>
                        )}
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </section>
          )}

          {/* LEVEL 3: TILES VIEW (Image + Name Alone) */}
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
                    placeholder="Search tiles by name..."
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold text-sm transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Ultra Narrow Tile Cards Grid */}
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {(Array.isArray(tiles) ? tiles : []).length > 0 ? (
                  tiles.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard product={product} />
                    </StaggerItem>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-brand-textMuted bg-brand-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-lg font-medium mb-1">No tile products found</p>
                    <p className="text-sm text-gray-400 mb-4">Try adjusting your search terms.</p>
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
    </div>
  );
};

export default PublicCollections;
