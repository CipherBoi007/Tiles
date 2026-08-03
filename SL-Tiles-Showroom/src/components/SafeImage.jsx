import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80";

const SafeImage = ({ src, alt, className, loading = "lazy", ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isFallbackError, setIsFallbackError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    } else {
      setIsFallbackError(true);
    }
  };

  if (isFallbackError || !src || src.includes('undefined') || src === 'null') {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} {...props}>
        <ImageIcon className="text-gray-400 w-1/4 h-1/4 opacity-50" />
      </div>
    );
  }

  return (
    <>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
      )}
      <img
        ref={imgRef}
        src={hasError ? FALLBACK_IMAGE : src}
        alt={alt || "Image"}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        loading={loading}
        {...props}
      />
    </>
  );
};

export default SafeImage;
