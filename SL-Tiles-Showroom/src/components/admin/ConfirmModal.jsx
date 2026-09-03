import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * Luxury Custom Confirmation Modal
 * Replaces default window.confirm() with modern animated dialog overlay covering whole screen.
 */
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Delete", 
  type = "danger", // "danger" | "warning" | "info"
  loading = false
}) => {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-brand-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl max-w-md w-full border border-gray-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-text rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center pt-2">
          {/* Header Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
            isDanger 
              ? 'bg-red-50 text-red-500 border border-red-100 shadow-sm' 
              : 'bg-amber-50 text-amber-500 border border-amber-100 shadow-sm'
          }`}>
            {isDanger ? <Trash2 size={26} /> : <AlertTriangle size={26} />}
          </div>

          {/* Title & Message */}
          <h3 className="text-xl font-luxury font-bold text-brand-text mb-2">
            {title}
          </h3>
          <p className="text-brand-textMuted text-xs leading-relaxed max-w-xs mb-6">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-brand-text font-semibold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={async () => {
                await onConfirm();
                onClose();
              }}
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                isDanger 
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                  : 'bg-brand-gold hover:bg-yellow-600 shadow-brand-gold/20'
              }`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
