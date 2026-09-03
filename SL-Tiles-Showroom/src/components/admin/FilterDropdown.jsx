import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Check, FolderOpen, Layers } from 'lucide-react';

/**
 * Custom Luxury Filter Dropdown Component
 * @param {Array} options - List of filter options [{ label: string, value: string, group?: string }]
 * @param {string} value - Currently active filter value
 * @param {function} onChange - Callback when an option is selected (value: string)
 * @param {string} placeholder - Default text when no filter is active
 */
const FilterDropdown = ({ options = [], value = '', onChange, placeholder = 'All Items' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find label of active value
  const selectedOption = options.find(opt => String(opt.value) === String(value));
  const activeLabel = selectedOption ? selectedOption.label : placeholder;
  const isFiltered = Boolean(value);

  // Group options if 'group' property exists
  const groupedOptions = options.reduce((acc, opt) => {
    const groupName = opt.group || 'General';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(opt);
    return acc;
  }, {});

  const hasGroups = Object.keys(groupedOptions).length > 1 || !groupedOptions['General'];

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2 bg-white border rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
          isFiltered 
            ? 'border-brand-gold text-brand-gold bg-[#FFF8E7]/40 ring-2 ring-brand-gold/15' 
            : 'border-gray-200 text-brand-text hover:border-brand-gold/60 hover:bg-gray-50/80'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <Filter size={15} className={isFiltered ? 'text-brand-gold' : 'text-gray-400'} />
          <span className="truncate max-w-[150px] sm:max-w-[180px]">
            {activeLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          )}
          <ChevronDown 
            size={14} 
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`} 
          />
        </div>
      </button>

      {/* Dropdown Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          {/* Default Option (Clear Filter) */}
          <button
            type="button"
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              !value 
                ? 'bg-brand-gold text-white shadow-sm' 
                : 'text-brand-text hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers size={14} className={!value ? 'text-white' : 'text-gray-400'} />
              {placeholder}
            </span>
            {!value && <Check size={14} className="text-white shrink-0" />}
          </button>

          <div className="my-1 border-t border-gray-100"></div>

          {/* Grouped or Flat Options */}
          {hasGroups ? (
            Object.entries(groupedOptions).map(([groupName, groupOpts]) => (
              <div key={groupName} className="mb-2 last:mb-0">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderOpen size={11} className="text-brand-gold" /> {groupName}
                </div>
                <div className="space-y-0.5">
                  {groupOpts.map(opt => {
                    const isSelected = String(opt.value) === String(value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onChange(opt.value);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                          isSelected 
                            ? 'bg-brand-gold/15 text-brand-gold font-bold' 
                            : 'text-brand-text hover:bg-[#FFF8E7]/60 hover:text-brand-gold font-medium'
                        }`}
                      >
                        <span className="truncate pr-2">{opt.label}</span>
                        {isSelected && <Check size={14} className="text-brand-gold shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-0.5">
              {options.map(opt => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                      isSelected 
                        ? 'bg-brand-gold/15 text-brand-gold font-bold' 
                        : 'text-brand-text hover:bg-[#FFF8E7]/60 hover:text-brand-gold font-medium'
                    }`}
                  >
                    <span className="truncate pr-2">{opt.label}</span>
                    {isSelected && <Check size={14} className="text-brand-gold shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
