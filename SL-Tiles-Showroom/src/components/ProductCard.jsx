import React from 'react';
import SafeImage from './SafeImage';

const ProductCard = ({ product, onQuickView }) => {
  return (
    <div 
      onClick={() => onQuickView && onQuickView(product)}
      className="group bg-brand-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.tag && (
          <div className="absolute top-3 left-3 z-10 bg-brand-black/80 text-brand-white text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-sm">
            {product.tag}
          </div>
        )}
        <SafeImage 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-3.5 sm:p-5">
        <h3 className="text-base sm:text-xl font-luxury font-semibold text-brand-black mb-1.5 sm:mb-3 leading-snug group-hover:text-brand-gold transition-colors">{product.name}</h3>
        
        <div className="space-y-0.5 text-xs sm:text-sm text-brand-textMuted">
          <p><span className="font-medium text-brand-black">Size:</span> {product.size || 'N/A'}</p>
          <p><span className="font-medium text-brand-black">Palette:</span> {product.palette || product.color || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
