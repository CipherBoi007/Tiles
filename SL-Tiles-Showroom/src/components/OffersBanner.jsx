import React from 'react';
import { Building2, Percent, FileText, Phone } from 'lucide-react';
import { FadeUp, ScaleUp } from './animations/MotionWrappers';
import SafeImage from './SafeImage';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const OffersBanner = () => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();
  const navigate = useNavigate();

  const handleBulkQuote = (e) => {
    e.preventDefault();
    captureLead('Bulk Quote Enquiry', () => {
      openWhatsApp({ 
        phone: settings?.whatsappNumber || '+919876543210',
        message: 'Hello! I am interested in bulk tile ordering for a construction project. Please share your bulk price quote.'
      });
    });
  };

  const handleDownloadCatalogue = (e) => {
    e.preventDefault();
    navigate('/catalogues');
  };

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
            
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-luxury font-semibold text-brand-black mb-8 leading-tight">
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
              <button 
                onClick={handleBulkQuote}
                className="px-10 py-4 bg-brand-gold hover:bg-yellow-600 text-brand-white text-xl font-medium rounded-sm flex items-center justify-center gap-3 transition-colors shadow-xl shadow-brand-gold/20"
              >
                <Phone className="w-6 h-6" />
                Get Bulk Quote
              </button>
              <button 
                onClick={handleDownloadCatalogue}
                className="px-10 py-4 border-2 border-gray-300 text-brand-black hover:border-brand-black hover:bg-gray-50 text-xl font-medium rounded-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                Download Catalogue
              </button>
            </div>
          </FadeUp>
          
          {/* Right Image Composition */}
          <ScaleUp className="w-full lg:w-1/2 xl:w-7/12" delay={0.2}>
            <div className="relative w-full pt-2 pr-2 pb-6">
              {/* Back Layer (Horizontal Landscape Image - Shifted Lower) */}
              <div className="w-[88%] sm:w-[85%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 relative z-10 mt-8 sm:mt-10">
                <SafeImage 
                  src="https://static.vecteezy.com/system/resources/thumbnails/047/266/503/small_2x/industrial-worker-handyman-installing-big-ceramic-tiles-photo.jpg" 
                  alt="Industrial worker handyman installing big ceramic tiles" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Layer (Vertical Portrait Image - Shifted Upper) */}
              <div className="absolute right-0 top-0 sm:top-2 z-20 w-[44%] sm:w-[38%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <SafeImage 
                  src="https://thumbs.dreamstime.com/b/professional-male-builder-sticking-ceramic-tiles-wall-bathroom-being-renovated-professional-male-builder-sticking-309926740.jpg" 
                  alt="Professional male builder sticking ceramic tiles" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScaleUp>

        </div>
      </div>
    </section>
  );
};

export default OffersBanner;
