import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTileCategories } from '../hooks/useDataFetch';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import SafeImage from './SafeImage';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const CategoryGrid = () => {
  const { data: collections, pagination, setPage, loading } = useTileCategories(8);

  return (
    <section id="categories" className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black font-luxury mb-4">Shop by Space</h2>
            <p className="text-brand-textMuted text-lg max-w-2xl">Find the perfect tiles tailored for every corner of your home.</p>
          </FadeUp>
          <Link to="/collections" className="hidden md:flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors">
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((cat) => (
            <StaggerItem 
              key={cat.id} 
              className="group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/5]"
              onClick={() => {
                window.location.href = `/collections?search=${encodeURIComponent(cat.name)}`;
              }}
            >
              <SafeImage 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 md:via-brand-black/20 to-transparent flex flex-col justify-end p-6"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-brand-white text-2xl font-luxury font-medium mb-1">{cat.name}</h3>
                {cat.desc && (
                  <p className="text-gray-300 text-sm mb-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                    {cat.desc}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-brand-gold opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {collections.length > 0 && (
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={setPage} 
          />
        )}
        
        <Link to="/collections" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 text-brand-gold font-medium hover:text-yellow-600">
          View All Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
