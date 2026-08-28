import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu, X, FolderOpen, FolderTree, Grid, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import SafeImage from '../SafeImage';

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { categories, subCategories, tiles, settings } = useData();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categoryList = Array.isArray(categories) ? categories : (categories?.data || []);
  const subCategoryList = Array.isArray(subCategories) ? subCategories : (subCategories?.data || []);
  const tileList = Array.isArray(tiles) ? tiles : (tiles?.data || []);

  // Filter matching items
  const trimmed = query.trim().toLowerCase();
  const matchedCategories = trimmed 
    ? categoryList.filter(c => c.name?.toLowerCase().includes(trimmed) || c.desc?.toLowerCase().includes(trimmed)) 
    : [];

  const matchedSubCategories = trimmed 
    ? subCategoryList.filter(s => 
        s.name?.toLowerCase().includes(trimmed) || 
        s.desc?.toLowerCase().includes(trimmed) ||
        s.category?.name?.toLowerCase().includes(trimmed)
      ) 
    : [];

  const matchedTiles = trimmed 
    ? tileList.filter(t => 
        t.name?.toLowerCase().includes(trimmed) || 
        t.size?.toLowerCase().includes(trimmed) || 
        t.finish?.toLowerCase().includes(trimmed) ||
        t.palette?.toLowerCase().includes(trimmed) ||
        t.subCategory?.name?.toLowerCase().includes(trimmed)
      ) 
    : [];

  const totalResults = matchedCategories.length + matchedSubCategories.length + matchedTiles.length;

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectResult = (path, searchVal) => {
    setIsOpen(false);
    navigate(`${path}?search=${encodeURIComponent(searchVal)}`);
  };

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

      {/* 2. Global Search Section */}
      <div ref={dropdownRef} className="relative w-full md:w-auto order-last md:order-none mt-3 md:mt-0 md:mr-6 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search....." 
            className="pl-10 pr-9 py-2 bg-brand-lightBg border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all w-full sm:w-[22rem] md:w-80 text-brand-text"
          />
          {query && (
            <button 
              onClick={() => { setQuery(''); setIsOpen(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        {isOpen && trimmed.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[28rem] overflow-y-auto z-50 p-3 space-y-4">
            
            {totalResults === 0 ? (
              <div className="py-6 text-center text-gray-400 text-xs font-medium">
                No matching Categories, SubCategories, or Tiles found for "{query}".
              </div>
            ) : (
              <>
                {/* Categories Group */}
                {matchedCategories.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <FolderOpen size={14} className="text-brand-gold" /> Categories ({matchedCategories.length})
                    </div>
                    <div className="space-y-1">
                      {matchedCategories.slice(0, 3).map(cat => (
                        <div 
                          key={cat.id}
                          onClick={() => handleSelectResult('/admin/categories', cat.name)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-gold/10 cursor-pointer transition-colors group"
                        >
                          <SafeImage src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-text group-hover:text-brand-gold truncate">{cat.name}</p>
                            <p className="text-xs text-gray-400 truncate">{cat.desc || 'Category'}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-gold shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubCategories Group */}
                {matchedSubCategories.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-2">
                      <FolderTree size={14} className="text-blue-500" /> SubCategories ({matchedSubCategories.length})
                    </div>
                    <div className="space-y-1">
                      {matchedSubCategories.slice(0, 3).map(sub => (
                        <div 
                          key={sub.id}
                          onClick={() => handleSelectResult('/admin/subcategories', sub.name)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors group"
                        >
                          <SafeImage src={sub.image} alt={sub.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-text group-hover:text-blue-600 truncate">{sub.name}</p>
                            <p className="text-xs text-gray-400 truncate">
                              Category: {sub.category?.name || 'Parent Category'}
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tile Products Group */}
                {matchedTiles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-2">
                      <Grid size={14} className="text-green-600" /> Tile Products ({matchedTiles.length})
                    </div>
                    <div className="space-y-1">
                      {matchedTiles.slice(0, 4).map(tile => (
                        <div 
                          key={tile.id}
                          onClick={() => handleSelectResult('/admin/tiles', tile.name)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-green-50 cursor-pointer transition-colors group"
                        >
                          <SafeImage src={tile.image} alt={tile.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-text group-hover:text-green-600 truncate">{tile.name}</p>
                            <p className="text-xs text-gray-400 truncate">
                              {tile.size ? `${tile.size} • ` : ''}{tile.finish || tile.subCategory?.name || 'Tile Product'}
                            </p>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-green-600 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 3. Right Section (Admin Profile & Bell) */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <button className="relative p-2 text-brand-textMuted hover:text-brand-gold transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-brand-white rounded-full flex items-center justify-center text-brand-gold shadow-sm border border-gray-100">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-luxury font-semibold text-brand-text">Admin</p>
            <p className="text-xs text-brand-textMuted font-medium">admin@admin.com</p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Topbar;
