import React from 'react';
import { X } from 'lucide-react';

const filterCategories = {
  Category: ['Living Room', 'Bathroom', 'Kitchen', 'Outdoor', 'Wall Tiles'],
  Color: ['White', 'Beige', 'Grey', 'Black', 'Gold', 'Blue'],
  Finish: ['Glossy', 'Matte', 'Satin', 'Rustic', 'Metallic'],
  Size: ['300x300', '600x600', '800x800', '1200x600', '1200x1200']
};

const FilterSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const content = (
    <div className="space-y-8">
      <div className="flex items-center justify-between lg:hidden mb-6">
        <h2 className="text-xl font-luxury font-bold">Filters</h2>
        <button onClick={() => setIsMobileOpen(false)}><X className="w-6 h-6" /></button>
      </div>

      {Object.entries(filterCategories).map(([title, options]) => (
        <div key={title}>
          <h3 className="font-semibold text-brand-black mb-3">{title}</h3>
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-brand-gold bg-gray-100 border-gray-300 rounded focus:ring-brand-gold focus:ring-2"
                />
                <span className="text-brand-textMuted group-hover:text-brand-gold transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pr-8 border-r border-gray-100">
        <h2 className="text-2xl font-luxury font-bold text-brand-black mb-6">Filters</h2>
        {content}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)}></div>
          <aside className="relative w-4/5 max-w-sm w-full bg-brand-white h-full p-6 overflow-y-auto shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
