import React from 'react';
import { Building2, Percent, FileText, Phone } from 'lucide-react';
import { FadeUp, ScaleUp } from './animations/MotionWrappers';
import SafeImage from './SafeImage';

const OffersBanner = () => {
  return (
    <section className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
          
          {/* Left Content */}
          <FadeUp className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 text-brand-gold font-medium uppercase tracking-widest text-sm mb-6">
              <Building2 className="w-5 h-5" />
              <span>For Builders & Contractors</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-brand-black mb-6 leading-tight">
              Bulk Orders for Builders
            </h2>
            
            <p className="text-brand-textMuted text-lg mb-10 leading-relaxed max-w-xl">
              Special pricing and dedicated support for construction professionals. Partner with us for your next project.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-sm flex items-center justify-center shrink-0">
                  <Percent className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black mb-1 text-lg">Bulk Discounts</h4>
                  <p className="text-sm text-brand-textMuted">Up to 30% off on large orders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-sm flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black mb-1 text-lg">Credit Terms</h4>
                  <p className="text-sm text-brand-textMuted">Flexible payment options</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-brand-gold hover:bg-yellow-600 text-brand-white text-lg font-medium rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-gold/20">
                <Phone className="w-5 h-5" />
                Get Bulk Quote
              </button>
              <button className="px-8 py-3 border border-gray-300 text-brand-black hover:border-brand-black hover:bg-gray-50 text-lg font-medium rounded-sm flex items-center justify-center transition-colors">
                Download Catalogue
              </button>
            </div>
          </FadeUp>
          
          {/* Right Image Container */}
          <ScaleUp className="w-full lg:w-1/2" delay={0.2}>
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden shadow-2xl">
              <SafeImage 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Hall for Builders" 
                className="w-full h-full object-cover"
              />
            </div>
          </ScaleUp>

        </div>
      </div>
    </section>
  );
};

export default OffersBanner;
