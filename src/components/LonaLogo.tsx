import React from 'react';

interface LonaLogoProps {
  variant?: 'full' | 'emblem';
  theme?: 'navy' | 'white';
  showSlogan?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LonaLogo: React.FC<LonaLogoProps> = ({
  variant = 'full',
  theme = 'navy',
  showSlogan = false,
  className = '',
  size = 'md',
}) => {
  const isWhite = theme === 'white';
  const logoSrc = isWhite ? '/logolona-white-png.png' : '/logolona-png.png';

  // Responsive dimensions
  // sm: mobile compact (h-8 to h-9)
  // md: header standard (h-9 to h-11)
  // lg: footer prominent (h-11 to h-14)
  // xl: extra large (h-14 to h-16)
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-11 sm:h-14',
    xl: 'h-14 sm:h-16',
  };

  const currentHeight = heights[size];

  if (variant === 'emblem') {
    const mainColor = isWhite ? '#FFFFFF' : '#162E56';
    return (
      <svg
        viewBox="0 0 140 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto shrink-0 select-none ${className}`}
        aria-label="Fondation Lona Écusson"
      >
        <defs>
          <linearGradient id={`goldGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE496" />
            <stop offset="50%" stopColor="#E5BA5A" />
            <stop offset="100%" stopColor="#C69244" />
          </linearGradient>
        </defs>

        {/* Outer Arch Dome */}
        <path
          d="M 18 80 A 52 52 0 0 1 122 80"
          stroke={mainColor}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* Open Book Foundation */}
        <path
          d="M 10 76 C 36 90 56 90 68 114 C 64 117 48 116 34 112 C 18 106 12 94 10 76 Z"
          fill={mainColor}
        />
        <path
          d="M 130 76 C 104 90 84 90 72 114 C 76 117 92 116 106 112 C 122 106 128 94 130 76 Z"
          fill={mainColor}
        />

        {/* Main Center 4-Point Golden Star */}
        <path
          d="M 70 38 Q 70 58 86 58 Q 70 58 70 78 Q 70 58 54 58 Q 70 58 70 38 Z"
          fill={`url(#goldGrad-${theme})`}
        />

        {/* Upper Right 4-Point Golden Star */}
        <path
          d="M 98 22 Q 98 32 106 32 Q 98 32 98 42 Q 98 32 90 32 Q 98 32 98 22 Z"
          fill={`url(#goldGrad-${theme})`}
        />

        {/* Upper Left 4-Point Golden Star */}
        <path
          d="M 44 34 Q 44 42 50 42 Q 44 42 44 50 Q 44 42 38 42 Q 44 42 44 34 Z"
          fill={`url(#goldGrad-${theme})`}
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex flex-col select-none shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt="Fondation Lona"
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
