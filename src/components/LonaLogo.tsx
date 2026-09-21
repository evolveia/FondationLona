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
  const mainColor = isWhite ? '#FFFFFF' : '#122C54';
  const dividerColor = isWhite ? '#0F2648' : '#FFFFFF';

  // Responsive dimensions
  // sm: mobile compact, md: header standard, lg: footer prominent
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-11 sm:h-14',
    xl: 'h-14 sm:h-16',
  };

  const currentHeight = heights[size];

  if (variant === 'emblem') {
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
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#E8B84B" />
            <stop offset="100%" stopColor="#B4821E" />
          </linearGradient>
          <radialGradient id={`starFlare-${theme}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
          </radialGradient>
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
          d="M 10 76 C 36 90 58 90 70 114 C 82 90 104 90 130 76 C 126 98 106 114 70 120 C 34 114 14 98 10 76 Z"
          fill={mainColor}
        />
        {/* Book Center Spine */}
        <path
          d="M 70 98 L 70 120"
          stroke={dividerColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Radiant Spark Flare at Book Opening */}
        <ellipse cx="70" cy="98" rx="8" ry="4" fill={`url(#starFlare-${theme})`} />

        {/* Main Center 4-Point Golden Star */}
        <path
          d="M 70 42 Q 70 59 84 59 Q 70 59 70 76 Q 70 59 56 59 Q 70 59 70 42 Z"
          fill={`url(#goldGrad-${theme})`}
        />
        <circle cx="70" cy="59" r="2.5" fill="#FFFFFF" />

        {/* Upper Right 4-Point Golden Star */}
        <path
          d="M 96 24 Q 96 34 104 34 Q 96 34 96 44 Q 96 34 88 34 Q 96 34 96 24 Z"
          fill={`url(#goldGrad-${theme})`}
        />

        {/* Upper Left 4-Point Golden Star */}
        <path
          d="M 46 34 Q 46 42 52 42 Q 46 42 46 50 Q 46 42 40 42 Q 46 42 46 34 Z"
          fill={`url(#goldGrad-${theme})`}
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex flex-col select-none shrink-0 ${className}`}>
      <svg
        viewBox="0 0 380 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto shrink-0 transition-opacity duration-200`}
        aria-label="Fondation Lona"
      >
        <defs>
          <linearGradient id={`goldGradFull-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#E8B84B" />
            <stop offset="100%" stopColor="#B4821E" />
          </linearGradient>
          <radialGradient id={`starFlareFull-${theme}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Brand Text (Left) */}
        <g id="brand-text">
          {/* 'Fondation' with clean elegant typography */}
          <text
            x="12"
            y="44"
            fontFamily="Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="28"
            fontWeight="600"
            fill={mainColor}
            letterSpacing="0.2"
          >
            Fondation
          </text>

          {/* Capital 'L' with the signature curved notch/leaf cutout in the corner matching logolona-png.png */}
          <path
            d="M 12 58 L 27 58 L 27 94 C 33 89 42 86 52 86 L 68 86 L 68 116 L 12 116 Z"
            fill={mainColor}
          />
          <path
            d="M 27 94 C 27 82 38 72 50 72 L 68 72 L 68 86 C 52 86 42 89 27 94 Z"
            fill={isWhite ? '#0F2648' : '#FFFFFF'}
          />

          {/* 'ona' in bold matching logolona-png.png */}
          <text
            x="70"
            y="116"
            fontFamily="Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="68"
            fontWeight="800"
            fill={mainColor}
            letterSpacing="-2"
          >
            ona
          </text>
        </g>

        {/* Emblem (Right) - Arched Dome, Radiant Open Book, 3 Golden Stars */}
        <g id="brand-emblem" transform="translate(245, 0)">
          {/* Outer Arch Dome */}
          <path
            d="M 18 80 A 54 54 0 0 1 126 80"
            stroke={mainColor}
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
          />

          {/* Open Book / Radiant Foundation Base */}
          <path
            d="M 10 76 C 38 90 60 90 72 114 C 84 90 106 90 134 76 C 130 98 110 114 72 120 C 34 114 14 98 10 76 Z"
            fill={mainColor}
          />
          {/* Book Center Crease Divider */}
          <path
            d="M 72 98 L 72 120"
            stroke={dividerColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Core Radiant White Spark at Book Apex */}
          <ellipse cx="72" cy="98" rx="9" ry="4.5" fill={`url(#starFlareFull-${theme})`} />

          {/* Main Center 4-Point Golden Star */}
          <path
            d="M 72 40 Q 72 58 86 58 Q 72 58 72 76 Q 72 58 58 58 Q 72 58 72 40 Z"
            fill={`url(#goldGradFull-${theme})`}
          />
          <circle cx="72" cy="58" r="2.5" fill="#FFFFFF" />

          {/* Upper Right Golden Star */}
          <path
            d="M 98 22 Q 98 32 106 32 Q 98 32 98 42 Q 98 32 90 32 Q 98 32 98 22 Z"
            fill={`url(#goldGradFull-${theme})`}
          />

          {/* Upper Left Golden Star */}
          <path
            d="M 48 32 Q 48 40 54 40 Q 48 40 48 48 Q 48 40 42 40 Q 48 40 48 32 Z"
            fill={`url(#goldGradFull-${theme})`}
          />
        </g>
      </svg>

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
