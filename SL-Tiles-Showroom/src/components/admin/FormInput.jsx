import React from 'react';

const FormInput = ({ label, type = 'text', value, onChange, placeholder, required = false, rows = 3, min, step, disabled = false }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-brand-text mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>}
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          disabled={disabled}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all resize-y text-sm font-medium text-brand-text placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-50"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          disabled={disabled}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition-all text-sm font-medium text-brand-text placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-50"
        />
      )}
    </div>
  );
};

export default FormInput;
