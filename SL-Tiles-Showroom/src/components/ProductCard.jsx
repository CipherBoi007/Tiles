import React from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import SafeImage from './SafeImage';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';

const ProductCard = ({ product, onQuickView }) => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    captureLead('WhatsApp Enquiry', () => {
      openWhatsApp({
        phone: settings?.whatsappNumber,
        message: `Hello, I am interested in ${product.name}. Please assist me.`
      });
    });
  };

  return (
    <div className="group bg-brand-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 bg-brand-black text-brand-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
            {product.tag}
          </div>
        )}
        <SafeImage 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Action Buttons (Always visible on mobile) */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end md:items-center justify-center gap-4 pb-6 md:pb-0">
          <button 
            onClick={() => onQuickView(product)}
            className="w-10 h-10 md:w-12 md:h-12 bg-brand-white text-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-white transition-colors shadow-lg"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={handleWhatsApp}
            className="w-10 h-10 md:w-12 md:h-12 bg-green-500 text-brand-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
            title="WhatsApp Enquiry"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-luxury font-semibold text-brand-black mb-3">{product.name}</h3>
        
        <div className="space-y-1 text-sm text-brand-textMuted">
          <p><span className="font-medium text-brand-black">Size:</span> {product.size || 'N/A'}</p>
          <p><span className="font-medium text-brand-black">Palette:</span> {product.palette || product.color || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
