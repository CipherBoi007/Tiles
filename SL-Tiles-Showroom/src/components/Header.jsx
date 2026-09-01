import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';
import GlobalSearch from './GlobalSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { captureLead } = useLeadCapture();
  const { settings } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [imgError, setImgError] = useState(false);
  const whatsappNumber = settings?.whatsappNumber || '+91 98765 43210';
  const logoUrl = !imgError ? (settings?.logoUrl && settings.logoUrl !== '/logo.png' && settings.logoUrl !== '/SL_LOGO.png' ? settings.logoUrl : '/SL_LOGO_TRANS.png') : '/SL_LOGO_TRANS.png';

  const handleWhatsApp = (e) => {
    e.preventDefault();
    captureLead('WhatsApp Enquiry', () => {
      openWhatsApp({ phone: whatsappNumber });
    });
  };

  const handleBookVisit = (e) => {
    e.preventDefault();
    captureLead('Book Visit', () => {
      window.location.href = '/#contact';
      setIsMenuOpen(false);
    });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent 
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent py-2' 
            : 'bg-brand-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-0'
        }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 h-[72px] md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center py-1">
              <img 
                src={logoUrl} 
                alt={settings?.showroomName || "SRI LAKSHMI TILES AND GRANITES"} 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain max-h-[64px] transition-all duration-300"
                onError={() => setImgError(true)}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium tracking-wide transition-colors ${
                isTransparent 
                  ? 'text-white/90 hover:text-brand-gold drop-shadow-sm' 
                  : 'text-brand-textMuted hover:text-brand-gold'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/collections?view=collections" 
              className={`font-medium tracking-wide transition-colors ${
                isTransparent 
                  ? 'text-white/90 hover:text-brand-gold drop-shadow-sm' 
                  : 'text-brand-textMuted hover:text-brand-gold'
              }`}
            >
              Collections
            </Link>
            <Link 
              to="/collections?view=tiles" 
              className={`font-medium tracking-wide transition-colors ${
                isTransparent 
                  ? 'text-white/90 hover:text-brand-gold drop-shadow-sm' 
                  : 'text-brand-textMuted hover:text-brand-gold'
              }`}
            >
              All Tiles
            </Link>
            <Link 
              to="/catalogues" 
              className={`font-medium tracking-wide transition-colors ${
                isTransparent 
                  ? 'text-white/90 hover:text-brand-gold drop-shadow-sm' 
                  : 'text-brand-textMuted hover:text-brand-gold'
              }`}
            >
              Catalogues
            </Link>
            <a 
              href="/#contact" 
              className={`font-medium tracking-wide transition-colors ${
                isTransparent 
                  ? 'text-white/90 hover:text-brand-gold drop-shadow-sm' 
                  : 'text-brand-textMuted hover:text-brand-gold'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <GlobalSearch isTransparent={isTransparent} />
            <a 
              href="/#contact" 
              onClick={handleBookVisit} 
              className="px-5 py-2 bg-brand-gold text-brand-white hover:bg-yellow-600 transition-colors font-medium shadow-lg shadow-brand-gold/30 rounded-sm"
            >
              Book Visit
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <GlobalSearch isTransparent={isTransparent} />
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`focus:outline-none transition-colors ${
                isTransparent ? 'text-white hover:text-brand-gold' : 'text-brand-text hover:text-brand-gold'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Container */}
        <div className={`fixed inset-0 z-50 lg:hidden pointer-events-none transition-all ${isMenuOpen ? 'visible' : 'invisible delay-300'}`}>
          {/* Mobile Menu Backdrop */}
          <div 
            className={`absolute inset-0 bg-brand-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu Drawer */}
          <div className={`absolute top-0 right-0 h-screen w-full max-w-[80vw] sm:max-w-xs bg-brand-white shadow-2xl pointer-events-auto transform transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 h-[72px] sm:h-20 shrink-0">
              <span className="font-luxury font-bold text-xl tracking-wider text-brand-black">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-brand-text focus:outline-none hover:text-brand-gold transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <nav className="flex flex-col space-y-6 text-right items-end">
                <Link to="/" className="text-xl text-brand-text hover:text-brand-gold font-medium transition-colors border-b border-gray-50 pb-4 w-full" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/collections?view=collections" className="text-xl text-brand-text hover:text-brand-gold font-medium transition-colors border-b border-gray-50 pb-4 w-full" onClick={() => setIsMenuOpen(false)}>Collections</Link>
                <Link to="/collections?view=tiles" className="text-xl text-brand-text hover:text-brand-gold font-medium transition-colors border-b border-gray-50 pb-4 w-full" onClick={() => setIsMenuOpen(false)}>All Tiles</Link>
                <Link to="/catalogues" className="text-xl text-brand-text hover:text-brand-gold font-medium transition-colors border-b border-gray-50 pb-4 w-full" onClick={() => setIsMenuOpen(false)}>Catalogues</Link>
                <a href="/#contact" className="text-xl text-brand-text hover:text-brand-gold font-medium transition-colors pb-4 w-full" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col space-y-4">
                <a href="/#contact" onClick={handleBookVisit} className="w-full text-center px-6 py-3 bg-brand-gold hover:bg-yellow-600 text-brand-white transition-colors rounded-sm flex justify-center items-center font-medium shadow-lg shadow-brand-gold/20">
                  Book Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for non-homepage views so header doesn't cover top content */}
      {!isHomePage && <div className="h-[72px] md:h-20 shrink-0" />}
    </>
  );
};

export default Header;
