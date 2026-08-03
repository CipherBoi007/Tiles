import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-brand-text hover:bg-gray-50 hover:text-brand-gold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-text transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
          // Show first, last, current, and +/- 1 from current
          if (
            page === 1 || 
            page === totalPages || 
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                  currentPage === page 
                    ? 'bg-brand-gold text-white shadow-md shadow-brand-gold/20' 
                    : 'text-brand-text hover:bg-gray-50 hover:text-brand-gold'
                }`}
              >
                {page}
              </button>
            );
          } else if (
            page === currentPage - 2 || 
            page === currentPage + 2
          ) {
            return <span key={page} className="px-1 text-gray-400">...</span>;
          }
          return null;
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-brand-text hover:bg-gray-50 hover:text-brand-gold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-text transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
