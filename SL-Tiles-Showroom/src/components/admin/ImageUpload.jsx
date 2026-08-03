import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { uploadFile } from '../../services/uploadService';

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset error
    setError('');

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG).');
      return;
    }

    try {
      setIsUploading(true);
      const base64Url = await uploadFile(file);
      onChange(base64Url);
    } catch (err) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setIsUploading(false);
      // Clear input so same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-full h-64 border border-gray-200 rounded-xl overflow-hidden group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-sm"
              title="Remove Image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed ${error ? 'border-red-300 bg-red-50/50' : 'border-brand-gold/30 bg-[#FFF8E7]'} rounded-xl p-8 flex flex-col items-center justify-center text-center h-64 cursor-pointer hover:bg-brand-gold/10 transition-colors group relative`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-medium text-brand-text">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-brand-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className={`${error ? 'text-red-400' : 'text-brand-gold'} w-8 h-8`} />
              </div>
              <h3 className="font-semibold text-brand-text mb-1">{label}</h3>
              <p className="text-xs text-brand-textMuted mb-2">Click or drag and drop</p>
              <p className="text-[10px] text-gray-400 font-medium">PNG, JPG (MAX. 5MB)</p>
            </>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
