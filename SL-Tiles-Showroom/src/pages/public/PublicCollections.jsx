import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import SEO from '../../components/SEO';
import ProductCard from '../../components/ProductCard';
import TileModal from '../../components/TileModal';
import Pagination from '../../components/Pagination';
import SafeImage from '../../components/SafeImage';
import { useCollections, useTiles } from '../../hooks/useDataFetch';
import { FadeUp, StaggerContainer, StaggerItem } from '../../components/animations/MotionWrappers';
import { ArrowRight, Filter, X, Search, Layers, Grid, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PublicCollections = () => {
  const { data: collections } = useCollections(100);
  const { data: tiles, pagination, setPage, search, setSearch, setFilter, loading: tilesLoading } = useTiles(12);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCollection, setActiveCollection] = useState(null);
  const [viewMode, setViewMode] = useState('collections'); // 'collections' | 'tiles'
  
  const location = useLocation();
  const navigate = useNavigate();

  const categories = ['All', 'Marble', 'Ceramic', 'Vitrified', 'Natural Stone', 'Wooden', 'Luxury'];

  // Read URL query parameters for view mode, search & filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const viewParam = params.get('view');
    const searchQuery = params.get('search');
    
    if (viewParam === 'tiles') {
      setViewMode('tiles');
    } else if (viewParam === 'collections') {
      setViewMode('collections');
      setActiveCollection(null);
      setFilter({ key: '', value: '' });
    }

    if (searchQuery) {
      setSearch(searchQuery);
      setViewMode('tiles');
    }
  }, [location.search, setSearch, setFilter]);

  const handleCategoryFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setFilter({ key: '', value: '' });
    } else {
      setFilter({ key: 'category', value: cat });
    }
  };

  const handleCollectionSelect = (col) => {
    setActiveCollection(col);
    setFilter({ key: 'collectionId', value: col.id.toString() });
    setViewMode('tiles'); // Switch view to show matching tiles
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setActiveCollection(null);
    setSearch('');
    setFilter({ key: '', value: '' });
  };

  const handleSwitchView = (mode) => {
    setViewMode(mode);
    if (mode === 'collections') {
      setActiveCollection(null);
      setFilter({ key: '', value: '' });
      navigate('/collections?view=collections');
    } else {
      navigate('/collections?view=tiles');
    }
  };

  return (
    <div className="min-h-screen font-luxury bg-brand-lightBg flex flex-col">
      <SEO 
        title={viewMode === 'collections' ? "Curated Tile Collections" : "All Tile Products Catalog"} 
        description="Explore curated tile collections or browse our entire catalog of ceramic, vitrified, wall, and floor tiles."
      />
      <Header />
      
      <main className="flex-1 pt-0 pb-16">
        {/* Main Banner Header */}
        <div className="bg-brand-white border-b border-gray-100 py-6 mb-8 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-luxury text-brand-black mb-2">
                {viewMode === 'collections' ? 'Curated Collections' : 'All Tile Products'}
              </h1>
              <p className="text-brand-textMuted text-base max-w-2xl">
                {viewMode === 'collections'
                  ? 'Explore our themed design series and curated tile collections.'
                  : `Showing ${pagination.totalItems || tiles.length} tiles available in stock`}
              </p>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto border border-gray-200">
              <button
                onClick={() => handleSwitchView('collections')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  viewMode === 'collections'
                    ? 'bg-brand-gold text-white shadow-md font-bold'
                    : 'text-brand-textMuted hover:text-brand-black'
                }`}
              >
                <Layers size={16} /> Collections
              </button>
              <button
                onClick={() => handleSwitchView('tiles')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
          {/* VIEW 1: COLLECTIONS ONLY */}
          {viewMode === 'collections' && (
            <section>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(Array.isArray(collections) ? collections : []).slice(0, 4).map((col) => (
                  <StaggerItem key={col.id}>
                    <div 
                      onClick={() => handleCollectionSelect(col)}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer border border-gray-200 hover:border-brand-gold shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <SafeImage 
                          src={col.image} 
                          alt={col.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent"></div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-5 text-brand-white">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-luxury font-bold text-white group-hover:text-brand-gold transition-colors">{col.name}</h3>
                          {col.tilesCount !== undefined && (
                            <span className="text-[11px] bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full font-medium text-white">
                              {col.tilesCount} tiles
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-2 mb-3">{col.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">
                          View Collection Tiles <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* VIEW 2: TILES ONLY */}
          {viewMode === 'tiles' && (
            <section id="all-tiles-section">
              {/* If filtered by collection, show active collection banner */}
              {activeCollection && (
                <div className="mb-6 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleSwitchView('collections')}
                      className="p-2 bg-brand-white rounded-xl text-brand-black hover:bg-brand-gold hover:text-white transition-colors shadow-sm"
                      title="Back to Collections"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold font-luxury text-brand-black">
                        Viewing Collection: {activeCollection.name}
                      </h3>
                      <p className="text-xs text-brand-textMuted">{activeCollection.desc}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setActiveCollection(null); setFilter({ key: '', value: '' }); }}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium bg-white px-3 py-1.5 rounded-lg border border-red-200"
                  >
                    <X size={14} /> Clear Collection Filter
                  </button>
                </div>
              )}

              {/* Material Category Filter & Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                {/* Material Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 bg-brand-white p-2.5 rounded-2xl border border-gray-100 flex-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 flex items-center gap-1">
                    <Filter size={14} /> Material:
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryFilter(cat)}
                      className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                        activeCategory === cat 
                          ? 'bg-brand-gold text-brand-white shadow-md shadow-brand-gold/20 font-bold' 
                          : 'bg-gray-50 hover:bg-gray-100 text-brand-text'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                  {(activeCategory !== 'All' || activeCollection || search) && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-700 underline font-medium px-2 ml-auto"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tile products..."
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold text-sm transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Tile Cards Grid */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(Array.isArray(tiles) ? tiles : []).length > 0 ? (
                  tiles.slice(0, 8).map((product) => (
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
