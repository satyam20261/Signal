import React, { useState } from 'react';

interface AuthorAvatarProps {
  src?: string;
  name: string;
  sizeClass?: string;
  className?: string;
}

export const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  src,
  name,
  sizeClass = 'w-8 h-8',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  // Extract initials
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Consistent background hue based on name
  const colors = [
    'bg-[#4A3E31] text-[#FAF9F5]',
    'bg-[#78350F] text-[#FAF9F5]',
    'bg-[#1C1917] text-[#FAF9F5]',
    'bg-[#9A3412] text-[#FAF9F5]'
  ];
  const colorIndex = (name.charCodeAt(0) + name.length) % colors.length;
  const colorStyle = colors[colorIndex];

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-serif font-bold text-xs shrink-0 ring-1 ring-[#D8D2C4] ${colorStyle} ${className}`}
        title={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} shrink-0`}>
      <img
        src={src}
        alt={name}
        onError={() => setHasError(true)}
        className={`${sizeClass} rounded-full object-cover ring-1 ring-[#D8D2C4] ${className}`}
      />
    </div>
  );
};
