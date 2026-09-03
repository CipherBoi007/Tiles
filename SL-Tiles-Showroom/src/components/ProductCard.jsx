import React from 'react';
import SafeImage from './SafeImage';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-brand-white border border-gray-200/90 rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-2xl hover:border-brand-gold transition-all duration-300">
      {/* Narrow Vertical Image Container with Increased Padding Frame & Rounded Inner Corners */}
      <div className="relative aspect-[9/16] h-[300px] sm:h-[380px] md:h-[440px] w-full rounded-2xl overflow-hidden bg-gray-50">
        {product.tag && (
          <div className="absolute top-3 left-3 z-30 bg-brand-black/85 text-brand-white text-[9px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-sm border border-white/10">
            {product.tag}
          </div>
        )}
        
        <SafeImage 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Default Static Title Overlay (Visible before hover) */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-brand-black/85 via-brand-black/40 to-transparent p-3 text-center group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-xs sm:text-sm font-luxury font-bold text-white truncate px-1">
            {product.name}
          </h3>
        </div>

        {/* Down-to-Up Full Slider Overlay (Opens from bottom to top on hover showcasing Tile Name alone) */}
        <div className="absolute inset-0 z-20 bg-brand-black/55 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="text-[10px] sm:text-xs font-semibold text-brand-gold uppercase tracking-widest mb-2">
            Tile Showcase
          </span>
          
          <h3 className="text-sm sm:text-base md:text-lg font-luxury font-bold text-white leading-snug px-2">
            {product.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
