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
import { ChevronRight, Search, Filter, Layers, Bath, UtensilsCrossed, Wrench, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategoryDivision } from '../../components/CategoryGrid';

const PublicCollections = () => {
  const { data: categories } = useCategories(100);
  const { data: subCategories } = useSubCategories(100);
  const { data: tiles, pagination, setPage, search, setSearch, setFilter, loading: tilesLoading } = useTiles(12);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState('all'); // 'all' | 'tiles' | 'sanitaryware' | 'kitchen' | 'plumbing'
  const [viewMode, setViewMode] = useState('categories'); // 'categories' | 'subcategories' | 'tiles'
  
  const location = useLocation();
  const navigate = useNavigate();

  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);
  const subCategoryList = Array.isArray(subCategories) ? subCategories : (subCategories?.data || []);

  // Filter subcategories by active category selection
  const filteredSubCategories = selectedCategory
    ? subCategoryList.filter(sc => sc.categoryId === selectedCategory.id)
    : subCategoryList;

  // Dynamically Group Categories into Divisions
  const tileCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'tiles');
  const sanitaryCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'sanitaryware');
  const kitchenCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'kitchen');
  const plumbingCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'plumbing');

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

  // Helper renderer for Category Cards
  const renderCategoryCards = (items) => {
    return (
      <StaggerContainer className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-5 items-stretch">
        {items.map((cat, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <StaggerItem key={cat.id} className="w-full h-full">
              
              {/* MOBILE VIEW (< md): Alternating Left/Right Zigzag Cards */}
              <div 
                onClick={() => handleCategorySelect(cat)}
                className={`md:hidden group flex ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                } items-center bg-brand-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-gold/60 transition-all duration-300 h-36 active:scale-[0.98] cursor-pointer relative`}
              >
                {/* Image Section (42% width) */}
                <div className="w-[42%] h-full relative overflow-hidden shrink-0 bg-brand-black">
                  <SafeImage 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Section (58% width) */}
                <div className={`w-[58%] p-4 flex flex-col justify-between h-full bg-brand-white ${
                  isEven ? 'text-left pl-4 pr-3' : 'text-left pr-4 pl-3'
                }`}>
                  <div className="my-auto">
                    <h3 className="text-sm sm:text-base font-luxury font-bold text-brand-black uppercase tracking-wide group-hover:text-brand-gold transition-colors leading-snug line-clamp-2">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:text-yellow-600 transition-colors mt-2">
                    <span>Explore Series</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>

              {/* DESKTOP VIEW (>= md): Staggered Column Layout */}
              <div className="hidden md:flex flex-col gap-4 h-full">
                {isEven ? (
                  <>
                    {/* Name Box */}
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group flex flex-col items-center justify-center p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-24 text-center shrink-0"
                    >
                      <h3 className="text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Image Box */}
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[340px] flex-1"
                    >
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                        <span>View Series</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image Box */}
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[340px] flex-1"
                    >
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                        <span>View Series</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Name Box */}
                    <div 
                      onClick={() => handleCategorySelect(cat)}
                      className="group flex flex-col items-center justify-center p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-24 text-center shrink-0"
                    >
                      <h3 className="text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                        {cat.name}
                      </h3>
                    </div>
                  </>
                )}
              </div>

            </StaggerItem>
          );
        })}
      </StaggerContainer>
    );
  };

  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title="Showroom Collections & Product Catalog | SRI LAKSHMI TILES AND GRANITES" 
        description="Explore luxury floor tiles, wall tiles, natural stone slabs, sanitaryware, kitchen fittings, and plumbing pipes."
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
                All Categories
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
                    {selectedSubCategory ? selectedSubCategory.name : 'Products'}
                  </span>
                </>
              )}
            </nav>

            <p className="text-brand-textMuted text-xs sm:text-sm">
              {viewMode === 'categories' && 'Select a specialized category section to view sub-series and items.'}
              {viewMode === 'subcategories' && 'Choose a subcategory to browse available products.'}
              {viewMode === 'tiles' && `Showing ${pagination.totalItems || tiles.length} products.`}
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* LEVEL 1: CATEGORIES VIEW (Grouped into Dedicated Product Divisions) */}
          {viewMode === 'categories' && (
            <div>
              {/* Division Navigation Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                <button
                  onClick={() => setSelectedDivision('all')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedDivision === 'all'
                      ? 'bg-brand-black text-white shadow-md'
                      : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  All Categories
                </button>
                <button
                  onClick={() => setSelectedDivision('tiles')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedDivision === 'tiles'
                      ? 'bg-brand-gold text-white shadow-md'
                      : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  🧱 Tiles & Marbles
                </button>
                <button
                  onClick={() => setSelectedDivision('sanitaryware')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedDivision === 'sanitaryware'
                      ? 'bg-brand-black text-white shadow-md'
                      : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  🛁 Sanitaryware & Bathware
                </button>
                <button
                  onClick={() => setSelectedDivision('kitchen')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedDivision === 'kitchen'
                      ? 'bg-brand-gold text-white shadow-md'
                      : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  🍳 Kitchen Fittings
                </button>
                <button
                  onClick={() => setSelectedDivision('plumbing')}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedDivision === 'plumbing'
                      ? 'bg-brand-black text-white shadow-md'
                      : 'bg-white text-brand-text hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  🚰 Plumbing & Pipes
                </button>
              </div>

              {/* DIVISION 1: TILES, MARBLES & NATURAL STONES */}
              {(selectedDivision === 'all' || selectedDivision === 'tiles') && tileCategories.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6 border-b border-gray-200/70 pb-3">
                    <h2 className="text-2xl font-bold font-luxury text-brand-black flex items-center gap-3">
                      <span className="w-2.5 h-6 bg-brand-gold rounded-full"></span>
                      Tiles, Marbles & Natural Stones
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Explore Vitrified floor tiles, ceramic wall elevation, imported Italian marble slabs, and granite.
                    </p>
                  </div>
                  {renderCategoryCards(tileCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
                </div>
              )}

              {/* DIVISION 2: SANITARYWARE & BATHWARE */}
              {(selectedDivision === 'all' || selectedDivision === 'sanitaryware') && sanitaryCategories.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6 border-b border-gray-200/70 pb-3">
                    <h2 className="text-2xl font-bold font-luxury text-brand-black flex items-center gap-3">
                      <span className="w-2.5 h-6 bg-brand-black rounded-full"></span>
                      Sanitaryware & Bathware
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Designer wash basins, wall-hung closets, thermostatic rain showers, and bath fittings.
                    </p>
                  </div>
                  {renderCategoryCards(sanitaryCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
                </div>
              )}

              {/* DIVISION 3: KITCHEN FITTINGS & SINKS */}
              {(selectedDivision === 'all' || selectedDivision === 'kitchen') && kitchenCategories.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6 border-b border-gray-200/70 pb-3">
                    <h2 className="text-2xl font-bold font-luxury text-brand-black flex items-center gap-3">
                      <span className="w-2.5 h-6 bg-brand-gold rounded-full"></span>
                      Kitchen Fittings & Sinks
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Handmade SS 304 & Quartz kitchen sinks, 360° pull-out faucets, and modular accessories.
                    </p>
                  </div>
                  {renderCategoryCards(kitchenCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
                </div>
              )}

              {/* DIVISION 4: PLUMBING & PVC PIPES */}
              {(selectedDivision === 'all' || selectedDivision === 'plumbing') && plumbingCategories.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6 border-b border-gray-200/70 pb-3">
                    <h2 className="text-2xl font-bold font-luxury text-brand-black flex items-center gap-3">
                      <span className="w-2.5 h-6 bg-brand-black rounded-full"></span>
                      Plumbing & PVC Piping Systems
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                      Heavy-duty CPVC & UPVC plumbing pipes, brass valves, and UV protected water storage tanks.
                    </p>
                  </div>
                  {renderCategoryCards(plumbingCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
                </div>
              )}
            </div>
          )}

          {/* LEVEL 2: SUBCATEGORIES VIEW */}
          {viewMode === 'subcategories' && (
            <section>
              <div className="max-w-[1400px] mx-auto">
                <StaggerContainer className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
                  {filteredSubCategories.map((sub, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <StaggerItem key={sub.id} className="w-full h-full">
                        
                        {/* MOBILE VIEW (< md): Alternating Left/Right Zigzag Cards */}
                        <div 
                          onClick={() => handleSubCategorySelect(sub)}
                          className={`md:hidden group flex ${
                            isEven ? 'flex-row' : 'flex-row-reverse'
                          } items-center bg-brand-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-gold/60 transition-all duration-300 h-36 active:scale-[0.98] cursor-pointer relative`}
                        >
                          {/* Image Section (42% width) */}
                          <div className="w-[42%] h-full relative overflow-hidden shrink-0 bg-brand-black">
                            <SafeImage 
                              src={sub.image} 
                              alt={sub.name} 
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                          </div>

                          {/* Content Section (58% width) */}
                          <div className={`w-[58%] p-4 flex flex-col justify-between h-full bg-brand-white ${
                            isEven ? 'text-left pl-4 pr-3' : 'text-left pr-4 pl-3'
                          }`}>
                            <div className="my-auto">
                              <h3 className="text-sm sm:text-base font-luxury font-bold text-brand-black uppercase tracking-wide group-hover:text-brand-gold transition-colors leading-snug line-clamp-2">
                                {sub.name}
                              </h3>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:text-yellow-600 transition-colors mt-2">
                              <span>View Products</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                          </div>
                        </div>

                        {/* DESKTOP VIEW (>= md): Staggered Column Layout */}
                        <div className="hidden md:flex flex-col gap-4 h-full">
                          {isEven ? (
                            <>
                              <div 
                                onClick={() => handleSubCategorySelect(sub)}
                                className="group flex flex-col items-center justify-center p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-20 text-center shrink-0"
                              >
                                <h3 className="text-sm font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                                  {sub.name}
                                </h3>
                              </div>

                              <div 
                                onClick={() => handleSubCategorySelect(sub)}
                                className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[300px] flex-1"
                              >
                                <SafeImage 
                                  src={sub.image} 
                                  alt={sub.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                                  <span>Browse Products</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div 
                                onClick={() => handleSubCategorySelect(sub)}
                                className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[300px] flex-1"
                              >
                                <SafeImage 
                                  src={sub.image} 
                                  alt={sub.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                                  <span>Browse Products</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>

                              <div 
                                onClick={() => handleSubCategorySelect(sub)}
                                className="group flex flex-col items-center justify-center p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-20 text-center shrink-0"
                              >
                                <h3 className="text-sm font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                                  {sub.name}
                                </h3>
                              </div>
                            </>
                          )}
                        </div>

                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
                
                {filteredSubCategories.length === 0 && (
                  <div className="text-center py-16 bg-brand-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-brand-textMuted text-base font-medium">No subcategories currently registered under this category.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* LEVEL 3: TILES / PRODUCTS VIEW */}
          {viewMode === 'tiles' && (
            <section>
              {tilesLoading ? (
                <div className="text-center py-20 text-brand-textMuted font-medium text-lg">
                  Loading Products...
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {tiles.map((tile) => (
                      <ProductCard key={tile.id} tile={tile} />
                    ))}
                  </div>

                  {tiles.length === 0 && (
                    <div className="text-center py-20 bg-brand-white rounded-3xl border border-gray-100 p-8">
                      <p className="text-brand-textMuted text-lg font-medium mb-4">No products found matching your active filter.</p>
                      <button 
                        onClick={() => handleBreadcrumbClick('categories')}
                        className="px-6 py-2.5 bg-brand-gold text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors shadow-md cursor-pointer text-sm"
                      >
                        Reset & Browse All Categories
                      </button>
                    </div>
                  )}

                  {tiles.length > 0 && (
                    <div className="mt-12">
                      <Pagination 
                        currentPage={pagination.currentPage} 
                        totalPages={pagination.totalPages} 
                        onPageChange={setPage} 
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          )}

        </div>
      </main>

      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

export default PublicCollections;
