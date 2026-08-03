import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { FadeUp } from './animations/MotionWrappers';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';

import { useData } from '../context/DataContext';

const Hero = () => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const handleWhatsApp = () => {
    const execute = () => {
      openWhatsApp({ phone: settings?.whatsappNumber });
    };
    captureLead('WhatsApp Enquiry', execute);
  };
  return (
    <section className="relative w-full min-h-[560px] h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center bg-brand-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Tile Showroom" 
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full text-brand-white">
        <div className="max-w-2xl">
          <FadeUp delay={0.2}>
            <h2 className="text-brand-gold font-medium tracking-widest uppercase mb-4 text-sm md:text-base">The Art of Living</h2>
          </FadeUp>
          <FadeUp delay={0.4}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 font-luxury">
              Transform Your <br /> Space with Luxury
            </h1>
          </FadeUp>
          <FadeUp delay={0.6}>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-xl font-light">
              Discover our exclusive collection of premium imported tiles, crafted to bring elegance and sophistication to your home.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.8}>
            <button 
              onClick={handleWhatsApp}
              className="w-full sm:w-auto justify-center group px-8 py-4 bg-brand-gold hover:bg-yellow-600 text-brand-white text-lg font-medium rounded-sm flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-brand-gold/20"
            >
              <MessageCircle className="w-5 h-5 animate-pulse" />
              WhatsApp Enquiry
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Hero;
