import React from 'react';

interface LonaLogoProps {
  variant?: 'full' | 'emblem';
  theme?: 'navy' | 'white';
  showSlogan?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LonaLogo: React.FC<LonaLogoProps> = ({
  theme = 'navy',
  showSlogan = false,
  className = '',
  size = 'md',
}) => {
  const isWhite = theme === 'white';
  const logoSrc = isWhite ? '/logolona-white-png.png' : '/logolona-png.png';
  const altText = isWhite
    ? 'Fondation Lona'
    : "Fondation Lona - Ensemble, semons l'excellence";

  // Responsive dimensions calibrated for high-density crisp rendering
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-14 sm:h-16',
  };

  const currentHeight = heights[size];

  return (
    <div className={`inline-flex flex-col select-none shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt={altText}
        className={`${currentHeight} w-auto object-contain transition-opacity duration-200 pointer-events-none`}
        loading="eager"
        decoding="async"
      />

      {showSlogan && (
        <span
          className={`text-[10px] sm:text-[11px] italic tracking-tight font-medium mt-0.5 whitespace-nowrap pl-1 hidden sm:block ${
            isWhite ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          Ensemble, semons l'excellence
        </span>
      )}
    </div>
  );
};
