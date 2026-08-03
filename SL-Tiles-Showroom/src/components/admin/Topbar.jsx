import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-auto min-h-[4rem] md:h-20 py-3 md:py-0 bg-brand-white/95 backdrop-blur-md border-b border-gray-100 flex flex-wrap md:flex-nowrap items-center justify-between px-4 sm:px-6 md:px-8 shrink-0 sticky top-0 z-[60] shadow-sm">
      
      {/* 1. Left Section (Hamburger) */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-brand-textMuted hover:text-brand-gold transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 2. Search Section (Stacks on mobile, inline on desktop) */}
      <div className="relative w-full md:w-auto order-last md:order-none mt-3 md:mt-0 md:mr-6 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-brand-lightBg border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all w-full sm:w-[20rem] md:w-72 text-brand-text"
        />
      </div>

      {/* 3. Right Section (Icons) */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <button className="relative p-2 text-brand-textMuted hover:text-brand-gold transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-brand-black rounded-full flex items-center justify-center text-brand-gold shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-luxury font-semibold text-brand-text">Admin</p>
            <p className="text-xs text-brand-textMuted font-medium">admin@showroom.com</p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Topbar;
