import React from 'react';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { useData } from '../context/DataContext';
import { openWhatsApp } from '../utils/whatsappUtils';

const WhatsAppFloat = () => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const handleWhatsApp = () => {
    const execute = () => {
      openWhatsApp({ phone: settings?.whatsappNumber });
    };
    captureLead('WhatsApp Enquiry', execute);
  };

  return (
    <button 
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] w-16 h-16 sm:w-20 sm:h-20 md:w-[84px] md:h-[84px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none drop-shadow-2xl"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <img 
        src="/whatsapp-icon.png" 
        alt="WhatsApp" 
        className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = "https://toppng.com/uploads/preview/whatsapp-logo-vector-11573849504ftryug0qkh.png";
        }}
      />
    </button>
  );
};

export default WhatsAppFloat;
