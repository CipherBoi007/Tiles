import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../hooks/useDataFetch';
import { Link, useNavigate } from 'react-router-dom';
import SafeImage from './SafeImage';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const CategoryGrid = () => {
  const { data: categories } = useCategories(100);
  const navigate = useNavigate();
  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);

  return (
    <section id="categories" className="py-16 md:py-24 bg-brand-lightBg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-black font-luxury mb-3">Shop by Category</h2>
            <p className="text-brand-textMuted text-base md:text-lg max-w-2xl">Select a category to explore specialized series and subcategories.</p>
          </FadeUp>
          <Link to="/collections" className="hidden md:flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Vertical Alternating Columns Grid (Name UP/DOWN, Image DOWN/UP) */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 items-stretch">
          {categoryList.map((cat, idx) => {
            const isNameTop = idx % 2 === 0;

            const NameBox = (
              <div 
                key={`name-${cat.id}`}
                onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
                className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-20 sm:h-24 md:h-28 text-center shrink-0"
              >
                <h3 className="text-xs sm:text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                  {cat.name}
                </h3>
              </div>
            );

            const ImageBox = (
              <div 
                key={`img-${cat.id}`}
                onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
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
        
        <Link to="/collections" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 text-brand-gold font-medium hover:text-yellow-600">
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
