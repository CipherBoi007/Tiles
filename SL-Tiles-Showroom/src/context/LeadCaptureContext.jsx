import React, { createContext, useContext, useState, useEffect } from 'react';
import LeadCapturePopup from '../components/LeadCapturePopup';

const LeadCaptureContext = createContext();

export const useLeadCapture = () => useContext(LeadCaptureContext);

export const LeadCaptureProvider = ({ children }) => {
  const [hasCapturedLead, setHasCapturedLead] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    source: 'Website Entry',
    callback: null,
  });

  useEffect(() => {
    const captured = localStorage.getItem('luxetiles_lead_captured');
    if (captured) {
      setHasCapturedLead(true);
    } else {
      // Auto open on initial load with a slight delay
      const timer = setTimeout(() => {
        setPopupConfig({ source: 'Website Entry', callback: null });
        setIsPopupOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const captureLead = (source, callback) => {
    if (hasCapturedLead) {
      if (callback) callback();
      return;
    }
    setPopupConfig({ source, callback });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Callback is NOT executed if closed manually
  };

  const submitSuccess = () => {
    localStorage.setItem('luxetiles_lead_captured', 'true');
    setHasCapturedLead(true);
    setIsPopupOpen(false);
    if (popupConfig.callback) {
      popupConfig.callback();
    }
  };

  return (
    <LeadCaptureContext.Provider value={{ hasCapturedLead, captureLead }}>
      {children}
      {isPopupOpen && (
        <LeadCapturePopup 
          source={popupConfig.source} 
          onClose={closePopup} 
          onSuccess={submitSuccess} 
        />
      )}
    </LeadCaptureContext.Provider>
  );
};
