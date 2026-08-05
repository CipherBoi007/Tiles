import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { enquiryService } from '../services';

const LeadCapturePopup = ({ source, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [canClose, setCanClose] = useState(source !== 'Website Entry');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (source === 'Website Entry') {
      const timer = setTimeout(() => {
        setCanClose(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [source]);

  const validate = () => {
    const newErrors = {};
    if (!name || name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    // Indian mobile validation: exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // Save lead to mock DB via enquiryService
      await enquiryService.create({
        customer: name,
        phone: phone,
        email: '',
        description: '',
        status: 'New',
        source: source
      });
      
      onSuccess();
    } catch (error) {
      console.error("Failed to save lead", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-screen flex flex-col justify-end sm:justify-center items-center sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => canClose && onClose()}
      />
      
      {/* Modal / Bottom Sheet */}
      <div 
        className="relative w-full max-w-md max-h-[85dvh] flex flex-col bg-brand-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in duration-300 z-10"
      >
        {canClose && (
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 backdrop-blur text-gray-600 hover:bg-gray-200 hover:text-brand-black transition-colors"
          >
            <X size={18} />
          </button>
        )}
        
        <div className="bg-brand-lightBg p-6 sm:p-8 text-center relative overflow-hidden border-b border-brand-gold/10 shrink-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/5 to-transparent pointer-events-none"></div>
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden"></div>
          
          <h2 className="text-xl sm:text-2xl font-luxury font-bold text-brand-black mb-2 relative z-10">
            Welcome to SriLakshmi Tiles and Granites
          </h2>
          <p className="text-brand-textMuted text-xs sm:text-sm relative z-10 px-2">
            {source === 'Website Entry' 
              ? 'Please share your details to explore our premium collections.' 
              : `Please provide your details to continue with ${source}.`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-brand-gold focus:ring-brand-gold'} rounded-xl text-base transition-all outline-none focus:ring-2 focus:ring-opacity-20 text-brand-text`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">Phone Number *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    // Only allow numbers
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length <= 10) setPhone(val);
                    if (errors.phone) setErrors({...errors, phone: ''});
                  }}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-brand-gold focus:ring-brand-gold'} rounded-xl text-base transition-all outline-none focus:ring-2 focus:ring-opacity-20 text-brand-text`}
                  placeholder="10-digit mobile number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-brand-gold hover:bg-yellow-600 text-brand-white text-base font-medium rounded-xl transition-all shadow-lg shadow-brand-gold/20 disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
          
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400 pb-2">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Your information is secure and will not be shared.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadCapturePopup;
