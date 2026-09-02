import React, { useState } from 'react';
import { X, MessageCircle, Check } from 'lucide-react';
import SafeImage from './SafeImage';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';

const TileModal = ({ product, onClose }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const handleWhatsApp = () => {
    const execute = () => {
      openWhatsApp({
        phone: settings?.whatsappNumber,
        message: `Hello, I am interested in ${product.name}. Please assist me.`
      });
    };
    captureLead('WhatsApp Enquiry', execute);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-brand-white w-full max-w-[1120px] max-h-[calc(100vh-3rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Fixed Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[70] w-10 h-10 bg-white/95 shadow-md md:bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5 text-brand-black" />
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto w-full h-full smooth-scroll">
          {/* Left: Images */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col gap-4">
          <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden">
            <SafeImage src={activeImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[product.image, product.image, product.image].map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-brand-gold' : 'border-transparent'}`}
              >
                <SafeImage src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {product.tag && (
            <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4 w-max max-w-full truncate rounded-sm">
              {product.tag}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-luxury font-bold text-brand-black mb-8">{product.name}</h2>

          <button 
            onClick={handleWhatsApp}
            className="w-full py-4 bg-brand-gold hover:bg-yellow-600 text-brand-white text-lg font-medium rounded-sm flex items-center justify-center gap-3 transition-colors shadow-lg shadow-brand-gold/20"
          >
            <MessageCircle className="w-6 h-6" />
            Enquire via WhatsApp
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TileModal;
