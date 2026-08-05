import React from 'react';
import { Building2, Percent, FileText, Phone } from 'lucide-react';
import { FadeUp, ScaleUp } from './animations/MotionWrappers';
import SafeImage from './SafeImage';

const OffersBanner = () => {
  return (
    <section className="py-24 md:py-32 bg-brand-white">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Content */}
          <FadeUp className="w-full lg:w-1/2 xl:w-5/12">
            <div className="flex items-center gap-4 text-brand-gold font-semibold uppercase tracking-widest text-base mb-8">
              <Building2 className="w-6 h-6" />
              <span>For Builders & Contractors</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-luxury font-bold text-brand-black mb-8 leading-tight">
              Bulk Orders for Builders
            </h2>
            
            <p className="text-brand-textMuted text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl">
              Special pricing and dedicated support for construction professionals. Partner with us for your next project.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-14">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold rounded-sm flex items-center justify-center shrink-0">
                  <Percent className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-luxury font-bold text-brand-black mb-2 text-xl md:text-2xl">Bulk Discounts</h4>
                  <p className="text-base text-brand-textMuted">Up to 30% off on large orders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold rounded-sm flex items-center justify-center shrink-0">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-luxury font-bold text-brand-black mb-2 text-xl md:text-2xl">Credit Terms</h4>
                  <p className="text-base text-brand-textMuted">Flexible payment options</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-4 bg-brand-gold hover:bg-yellow-600 text-brand-white text-xl font-medium rounded-sm flex items-center justify-center gap-3 transition-colors shadow-xl shadow-brand-gold/20">
                <Phone className="w-6 h-6" />
                Get Bulk Quote
              </button>
              <button className="px-10 py-4 border-2 border-gray-300 text-brand-black hover:border-brand-black hover:bg-gray-50 text-xl font-medium rounded-sm flex items-center justify-center transition-colors">
                Download Catalogue
              </button>
            </div>
          </FadeUp>
          
          {/* Right Image Container */}
          <ScaleUp className="w-full lg:w-1/2 xl:w-7/12" delay={0.2}>
            <div className="relative aspect-[4/3] md:aspect-[16/10] w-full rounded-sm overflow-hidden shadow-2xl">
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
