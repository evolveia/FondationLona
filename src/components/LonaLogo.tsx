import React from 'react';

interface LonaLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'navy' | 'white';
  showSlogan?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LonaLogo: React.FC<LonaLogoProps> = ({
  variant = 'full',
  theme = 'navy',
  showSlogan = true,
  className = '',
  size = 'md',
}) => {
  const isWhite = theme === 'white';
  const navyColor = isWhite ? '#FFFFFF' : '#183D73';
  const goldColor = '#D49B28';
  const goldLight = '#F5D070';
  const goldDark = '#B88218';
  const sloganColor = isWhite ? '#E2E8F0' : '#475569';

  // Dimension scaling
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 1 : size === 'lg' ? 1.25 : 1.5;

  // The Emblem SVG containing the arch, 3 four-pointed stars, and open book base matching logolona.png
  const Emblem = () => (
    <svg
      width={46 * scale}
      height={46 * scale}
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="Fondation Lona Écusson"
    >
      <defs>
        <linearGradient id={`lonaGoldGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldLight} />
          <stop offset="50%" stopColor={goldColor} />
          <stop offset="100%" stopColor={goldDark} />
        </linearGradient>
      </defs>

      {/* Outer arched halo dome */}
      <path
        d="M 24 86 A 56 56 0 0 1 136 86"
        stroke={navyColor}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Open Book / Radiant Foundation Cradle */}
      <path
        d="M 16 82 C 44 96 68 96 80 120 C 92 96 116 96 144 82 C 140 106 120 122 80 128 C 40 122 20 106 16 82 Z"
        fill={navyColor}
      />
      {/* Central Book Spine Divider */}
      <path
        d="M 80 104 L 80 128"
        stroke={isWhite ? '#183D73' : '#FFFFFF'}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Main Center 4-Point Golden Star */}
      <path
        d="M 80 44 Q 80 64 96 64 Q 80 64 80 84 Q 80 64 64 64 Q 80 64 80 44 Z"
        fill={`url(#lonaGoldGrad-${theme})`}
      />
      <circle cx="80" cy="64" r="2.5" fill="#FFFBEB" opacity="0.9" />

      {/* Upper Left 4-Point Golden Star */}
      <path
        d="M 52 36 Q 52 46 60 46 Q 52 46 52 56 Q 52 46 44 46 Q 52 46 52 36 Z"
        fill={`url(#lonaGoldGrad-${theme})`}
      />

      {/* Upper Right 4-Point Golden Star */}
      <path
        d="M 108 24 Q 108 36 118 36 Q 108 36 108 48 Q 108 36 98 36 Q 108 36 108 24 Z"
        fill={`url(#lonaGoldGrad-${theme})`}
      />
    </svg>
  );

  if (variant === 'emblem') {
    return <Emblem />;
  }

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Brand Text (Left) */}
      <div className="flex flex-col justify-center text-left">
        <span
          className="text-xs sm:text-sm font-semibold tracking-wider leading-none mb-0.5"
          style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}
        >
          Fondation
        </span>
        <span
          className="font-extrabold tracking-tight text-2xl sm:text-3xl leading-none"
          style={{ color: navyColor, fontFamily: 'Montserrat, sans-serif' }}
        >
          Lona
        </span>

        {showSlogan && (
          <span
            className="text-[10px] sm:text-[11px] italic tracking-tight font-medium mt-1 whitespace-nowrap"
            style={{ color: sloganColor }}
          >
            Ensemble, semons l'excellence
          </span>
        )}
      </div>

      {/* Official Emblem (Right) - faithfully matching logolona.png */}
      <Emblem />
    </div>
  );
};

