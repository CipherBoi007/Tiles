import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import TileModal from './TileModal';
import { useTiles } from '../hooks/useDataFetch';
import Pagination from './Pagination';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductGrid = () => {
  const { data: tiles, pagination, setPage, search, setSearch, loading } = useTiles(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  // Support search from URL (Global Search)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query !== null) {
      setSearch(query);
      // scroll to collections
      document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.search, setSearch]);

  return (
    <section id="collections" className="py-20 bg-brand-lightBg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-black font-luxury mb-2">All Tile Products</h2>
            <p className="text-brand-textMuted text-lg">Browse our complete range of luxury ceramic, vitrified, wall, and floor tiles</p>
          </FadeUp>
          <Link to="/collections" className="flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors">
            Show All Tiles ({pagination.totalItems || tiles.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiles.length > 0 ? tiles.slice(0, 8).map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard 
                  product={product} 
                  onQuickView={setSelectedProduct} 
                />
              </StaggerItem>
            )) : (
              <div className="col-span-full py-12 text-center text-brand-textMuted">
                No tiles available at the moment.
              </div>
            )}
          </StaggerContainer>
        </div>

        {tiles.length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>

      {selectedProduct && (
        <TileModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default ProductGrid;
