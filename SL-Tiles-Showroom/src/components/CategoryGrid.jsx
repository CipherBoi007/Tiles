import React from 'react';
import { ArrowRight, Layers, Bath, UtensilsCrossed, Wrench } from 'lucide-react';
import { useCategories } from '../hooks/useDataFetch';
import { Link, useNavigate } from 'react-router-dom';
import SafeImage from './SafeImage';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

/**
 * Dynamic Division Classification Helper
 * Automatically classifies ANY category (seeded or created by Admin) into its proper section.
 */
export const getCategoryDivision = (cat) => {
  if (!cat) return 'tiles';
  
  // 1. Explicit Division stored by Admin
  if (cat.division) return cat.division;

  const name = (cat.name || '').toLowerCase();
  const slug = (cat.slug || '').toLowerCase();

  // 1. Sanitaryware & Bathware
  if (
    slug.includes('sanitary') || slug.includes('bath') || 
    name.includes('sanitary') || name.includes('bath') || 
    name.includes('wash') || name.includes('basin') || 
    name.includes('closet') || name.includes('shower') ||
    name.includes('faucet') || name.includes('tap')
  ) {
    return 'sanitaryware';
  }

  // 2. Kitchen Fittings & Sinks
  if (
    slug.includes('kitchen') || name.includes('kitchen') || 
    name.includes('sink')
  ) {
    return 'kitchen';
  }

  // 3. Plumbing & PVC Pipes
  if (
    slug.includes('plumbing') || slug.includes('pipe') || slug.includes('pvc') ||
    name.includes('plumbing') || name.includes('pipe') || 
    name.includes('pvc') || name.includes('cpvc') || name.includes('upvc') ||
    name.includes('tank') || name.includes('valve')
  ) {
    return 'plumbing';
  }

  // Default: Tiles, Marbles & Natural Stones
  return 'tiles';
};

const CategoryGrid = () => {
  const { data: categories } = useCategories(100);
  const navigate = useNavigate();
  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);

  // Dynamically Group & Limit Categories into Showroom Divisions for Landing Page Elegance
  const tileCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'tiles').slice(0, 3);
  const sanitaryCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'sanitaryware').slice(0, 3);
  const kitchenCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'kitchen').slice(0, 3);
  const plumbingCategories = categoryList.filter(cat => getCategoryDivision(cat) === 'plumbing').slice(0, 3);

  // Helper renderer for Alternating Column Cards
  const renderCategoryGridItems = (items) => {
    return (
      <StaggerContainer className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-5 items-stretch">
        {items.map((cat, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <StaggerItem key={cat.id} className="w-full h-full">
              
              {/* MOBILE VIEW (< md): Alternating Left/Right Zigzag Cards */}
              <div 
                onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
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
                    <span>Explore Collection</span>
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
                      onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
                      className="group flex flex-col items-center justify-center p-4 bg-brand-white border border-gray-200/80 rounded-xl cursor-pointer hover:border-brand-gold hover:shadow-lg transition-all duration-300 h-24 text-center shrink-0"
                    >
                      <h3 className="text-sm md:text-base font-luxury font-bold text-brand-black uppercase tracking-wider group-hover:text-brand-gold transition-colors leading-tight">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Image Box */}
                    <div 
                      onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
                      className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[340px] flex-1"
                    >
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image Box */}
                    <div 
                      onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
                      className="group relative overflow-hidden border border-gray-200/80 rounded-xl cursor-pointer bg-brand-black shadow-sm hover:shadow-xl transition-all duration-300 h-[340px] flex-1"
                    >
                      <SafeImage 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Name Box */}
                    <div 
                      onClick={() => navigate(`/collections?categoryId=${cat.id}`)}
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
    <section id="categories" className="py-16 md:py-24 bg-brand-lightBg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Main Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-6 border-b border-gray-200/70">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-black font-luxury mb-2">Shop by Category</h2>
            <p className="text-brand-textMuted text-base md:text-lg max-w-2xl">
              Explore curated product divisions from luxury tiles & marbles to designer sanitaryware, kitchen fittings, and plumbing solutions.
            </p>
          </FadeUp>
          <Link to="/collections" className="hidden md:flex items-center gap-2 text-brand-gold font-medium hover:text-yellow-600 transition-colors shrink-0">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ==================== SECTION 1: TILES, MARBLES & NATURAL STONES ==================== */}
        {tileCategories.length > 0 && (
          <div className="mb-20">
            <FadeUp className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-brand-black font-luxury flex items-center gap-3">
                <span className="w-2 h-6 bg-brand-gold rounded-full"></span>
                Tiles, Marbles & Natural Stones
              </h3>
              <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                Vitrified floor tiles, ceramic wall elevation, imported Italian marble slabs, and granite.
              </p>
            </FadeUp>

            {renderCategoryGridItems(tileCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
          </div>
        )}

        {/* ==================== SECTION 2: SANITARYWARE & BATHWARE ==================== */}
        {sanitaryCategories.length > 0 && (
          <div className="mb-20">
            <FadeUp className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-brand-black font-luxury flex items-center gap-3">
                <span className="w-2 h-6 bg-brand-black rounded-full"></span>
                Sanitaryware & Bathware
              </h3>
              <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                Designer wash basins, wall-hung water closets, thermostatic rain showers, and bath fittings.
              </p>
            </FadeUp>

            {renderCategoryGridItems(sanitaryCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
          </div>
        )}

        {/* ==================== SECTION 3: KITCHEN FITTINGS & SINKS ==================== */}
        {kitchenCategories.length > 0 && (
          <div className="mb-20">
            <FadeUp className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-brand-black font-luxury flex items-center gap-3">
                <span className="w-2 h-6 bg-brand-gold rounded-full"></span>
                Kitchen Fittings & Sinks
              </h3>
              <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                Handmade SS 304 & Quartz kitchen sinks, 360° pull-out faucets, and modular accessories.
              </p>
            </FadeUp>

            {renderCategoryGridItems(kitchenCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
          </div>
        )}

        {/* ==================== SECTION 4: PLUMBING & PVC PIPES ==================== */}
        {plumbingCategories.length > 0 && (
          <div className="mb-8">
            <FadeUp className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-brand-black font-luxury flex items-center gap-3">
                <span className="w-2 h-6 bg-brand-black rounded-full"></span>
                Plumbing & PVC Piping Systems
              </h3>
              <p className="text-xs sm:text-sm text-brand-textMuted mt-1">
                Heavy-duty CPVC & UPVC plumbing pipes, brass valves, and UV protected water storage tanks.
              </p>
            </FadeUp>

            {renderCategoryGridItems(plumbingCategories, "grid-cols-1 md:grid-cols-3 lg:grid-cols-3")}
          </div>
        )}

        <Link to="/collections" className="md:hidden mt-12 w-full flex justify-center items-center gap-2 text-brand-gold font-medium hover:text-yellow-600">
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
