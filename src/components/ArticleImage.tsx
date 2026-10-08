import React, { useState, useRef, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  priority = false
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync currentSrc when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Check if already completed (cached)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    // If it started with /src/assets/images/, retry with /images/
    if (currentSrc.includes('/src/assets/images/')) {
      const filename = currentSrc.split('/').pop();
      if (filename) {
        setCurrentSrc(`/images/${filename}`);
        return;
      }
    }
    // If it was another path with filename, try /images/
    if (!currentSrc.startsWith('/images/') && currentSrc.includes('.')) {
      const filename = currentSrc.split('/').pop()?.split('?')[0];
      if (filename) {
        setCurrentSrc(`/images/${filename}`);
        return;
      }
    }
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-[#ECE8DE] ${aspectRatioClass} ${className}`}>
      {!hasError ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EAE4D7] to-[#D9D1C1]">
          <div className="w-10 h-10 rounded-full bg-[#38332B]/10 flex items-center justify-center mb-2">
            <Newspaper className="w-5 h-5 text-[#4A4237]" />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#635A4D] font-medium max-w-[200px] truncate">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};

