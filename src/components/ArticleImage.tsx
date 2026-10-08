import React, { useState } from 'react';
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
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#ECE8DE] ${aspectRatioClass} ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 blur-sm'
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
