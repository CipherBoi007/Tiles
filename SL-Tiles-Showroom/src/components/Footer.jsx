import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';
import { useData } from '../context/DataContext';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { settings } = useData();
  const { captureLead } = useLeadCapture();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const showroomName = settings?.showroomName || "SRI LAKSHMI TILES AND GRANITES";

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    captureLead('Newsletter Subscription');
    setSubscribed(true);
    setNewsletterEmail('');

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative text-brand-white pt-20 pb-10 border-t border-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tiles_BG.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ minHeight: '100%', minWidth: '100%' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Social Column */}
          <StaggerItem>
            <Link to="/" className="font-luxury text-2xl font-bold tracking-wider text-brand-white mb-6 inline-block">
              {showroomName.split(' ').map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "text-brand-gold" : ""}>{word} </span>
              ))}
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              We bring the world's most luxurious and exotic imported tiles, vitrified slabs, and marble to elevate your living spaces. Experience unparalleled craftsmanship.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook Page"
                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-brand-gold hover:text-brand-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>

              {/* Instagram (Official) */}
              <a 
                href="https://www.instagram.com/sri_lakshmi_tiles_and_granite" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram Handle"
                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-brand-gold hover:text-brand-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Twitter Profile"
                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-brand-gold hover:text-brand-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </StaggerItem>

          {/* Quick Links Column */}
          <StaggerItem>
            <h4 className="text-lg font-luxury font-semibold mb-6 text-brand-gold">Quick Links</h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Curated Collections', href: '/collections?view=collections' },
                { name: 'All Tile Products', href: '/collections?view=tiles' },
                { name: 'PDF Catalogues', href: '/catalogues' },
                { name: 'Visit Showroom', href: '/#contact' }
              ].map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all text-brand-gold" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Collections Column */}
          <StaggerItem>
            <h4 className="text-lg font-luxury font-semibold mb-6 text-brand-gold">Our Collections</h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'Living Room Tiles', search: 'Living' },
                { name: 'Bathroom Elegance', search: 'Bathroom' },
                { name: 'Designer Kitchen', search: 'Kitchen' },
                { name: 'Outdoor & Parking', search: 'Outdoor' },
                { name: 'Luxury Wall Cladding', search: 'Wall' }
              ].map(item => (
                <li key={item.name}>
                  <Link 
                    to={`/collections?search=${encodeURIComponent(item.search)}`} 
                    className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all text-brand-gold" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Newsletter Column */}
          <StaggerItem>
            <h4 className="text-lg font-luxury font-semibold mb-6 text-brand-gold">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to receive design inspirations and exclusive catalogue offers.</p>
            
            {subscribed ? (
              <div className="bg-green-950/60 border border-green-700/50 rounded-xl p-3.5 text-green-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                <span>Thank you! You are subscribed to updates.</span>
              </div>
            ) : (
              <form 
                className="flex flex-col gap-3"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-gray-900 border border-gray-800 px-4 py-3 text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold rounded-xl transition-colors"
                />
                <button 
                  type="submit" 
                  className="w-full bg-brand-gold hover:bg-yellow-600 text-white text-sm py-3 font-medium transition-colors rounded-xl shadow-md shadow-brand-gold/10 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </StaggerItem>
        </StaggerContainer>

        <div className="pt-8 border-t border-gray-900 text-center space-y-4 md:space-y-0 md:flex md:justify-between md:text-left text-xs">
          <p className="text-white">&copy; {new Date().getFullYear()} {showroomName}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <span className="hover:text-brand-gold transition-colors cursor-pointer" onClick={() => alert("Privacy Policy: SRI LAKSHMI TILES AND GRANITES respects customer privacy.")}>Privacy Policy</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer" onClick={() => alert("Terms of Service: Standard showroom warranty applies.")}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
