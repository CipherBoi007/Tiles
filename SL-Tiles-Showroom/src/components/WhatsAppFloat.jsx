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
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
  );
};

export default WhatsAppFloat;
