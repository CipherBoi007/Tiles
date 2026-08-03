import React from 'react';
import { MessageCircle } from 'lucide-react';
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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform hover:-translate-y-2 animate-bounce focus:outline-none focus:ring-2 focus:ring-brand-white/60"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  );
};

export default WhatsAppFloat;
