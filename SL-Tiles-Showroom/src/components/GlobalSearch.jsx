import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { collectionService } from '../services';
import SafeImage from './SafeImage';
import { useNavigate } from 'react-router-dom';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const result = await collectionService.paginate({ page: 1, limit: 5, search: searchQuery });
        setSuggestions(result.data);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleResultClick = (query) => {
    setIsOpen(false);
    navigate(`/collections?search=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-brand-text hover:text-brand-gold transition-colors focus:outline-none flex items-center"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Expandable Search Input Container */}
      <div 
        className={`
          transition-all duration-300 ease-in-out sm:origin-right flex items-center bg-brand-white border border-gray-200 rounded-md shadow-2xl z-50
          fixed top-[72px] left-4 right-4 sm:absolute sm:top-1/2 sm:left-auto sm:right-0 sm:-translate-y-1/2
          ${isOpen ? 'opacity-100 visible sm:w-[600px] lg:w-[720px]' : 'opacity-0 invisible sm:w-0 border-transparent shadow-none scale-95 sm:scale-100'}
        `}
      >
        <form onSubmit={handleSearchSubmit} className="flex w-full items-center relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            autoFocus={isOpen}
            placeholder="Search tiles, colors, finishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 text-base focus:outline-none text-brand-text bg-transparent"
          />
          <button 
            type="button"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-text bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {isOpen && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-brand-white border border-gray-100 rounded-md shadow-2xl max-h-[500px] overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center text-base text-brand-textMuted font-medium">Searching...</div>
            ) : suggestions.length > 0 ? (
              <div className="flex flex-col py-3">
                {suggestions.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleResultClick(item.name)}
                    className="flex items-center gap-5 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-14 h-14 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                      <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-luxury font-bold text-brand-text text-base truncate mb-1">{item.name}</h4>
                      <p className="text-sm text-brand-textMuted truncate">{item.palette || item.size || 'Premium Tile'}</p>
                    </div>
                  </div>
                ))}
                <div 
                  onClick={handleSearchSubmit}
                  className="p-4 mt-2 text-center text-sm text-brand-gold hover:text-yellow-600 font-bold cursor-pointer border-t border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  View all results for "{searchQuery}"
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-base font-medium text-brand-text">No products found</p>
                <p className="text-sm text-brand-textMuted mt-1">Try a different keyword</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
