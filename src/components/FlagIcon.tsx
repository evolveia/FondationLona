import React from 'react';
import { Language } from '../types';

interface FlagIconProps {
  code: Language | string;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, className = 'w-5 h-3.5' }) => {
  const normalized = code.toLowerCase();

  const renderFlagSvg = () => {
    switch (normalized) {
      case 'fr':
        // French Flag: Blue, White, Red vertical stripes
        return (
          <svg viewBox="0 0 3 2" className="w-full h-full block">
            <rect width="1" height="2" fill="#002654" />
            <rect x="1" width="1" height="2" fill="#FFFFFF" />
            <rect x="2" width="1" height="2" fill="#ED2939" />
          </svg>
        );

      case 'en':
      case 'gb':
      case 'uk':
        // UK Union Jack
        return (
          <svg viewBox="0 0 60 30" className="w-full h-full block">
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#s)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path
                d="M0,0 L60,30 M60,0 L0,30"
                clipPath="url(#t)"
                stroke="#C8102E"
                strokeWidth="4"
              />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </svg>
        );

      case 'pt':
      case 'br':
        // Brazilian Flag: Green field, Yellow rhombus, Blue circle with white celestial band
        return (
          <svg viewBox="0 0 20 14" className="w-full h-full block">
            <rect width="20" height="14" fill="#009c3b" />
            <polygon points="10,1.75 18,7 10,12.25 2,7" fill="#ffdf00" />
            <circle cx="10" cy="7" r="3.5" fill="#002776" />
            <path
              d="M6.6,7.5 Q10,5.2 13.4,7.8"
              stroke="#ffffff"
              strokeWidth="0.75"
              fill="none"
            />
          </svg>
        );

      case 'es':
        // Spanish Flag: Red, Yellow (double height), Red
        return (
          <svg viewBox="0 0 3 2" className="w-full h-full block">
            <rect width="3" height="0.5" fill="#AA151B" />
            <rect y="0.5" width="3" height="1" fill="#F1BF00" />
            <rect y="1.5" width="3" height="0.5" fill="#AA151B" />
            {/* Simplified coat of arms accent */}
            <circle cx="0.8" cy="1" r="0.25" fill="#AA151B" opacity="0.85" />
          </svg>
        );

      case 'ar':
      case 'sa':
        // Saudi Arabia / Arab flag: Rich green with white calligraphic emblem
        return (
          <svg viewBox="0 0 3 2" className="w-full h-full block">
            <rect width="3" height="2" fill="#006C35" />
            <path
              d="M0.7,0.85 h1.6 M0.8,1.2 h1.4 M0.8,1.3 h1.4 M1.5,0.7 v0.7"
              stroke="#ffffff"
              strokeWidth="0.08"
              strokeLinecap="round"
            />
            <line x1="0.85" y1="1.4" x2="2.15" y2="1.4" stroke="#ffffff" strokeWidth="0.09" strokeLinecap="round" />
          </svg>
        );

      case 'zh':
      case 'cn':
        // Chinese Flag: Red field with large gold star and 4 smaller stars
        return (
          <svg viewBox="0 0 30 20" className="w-full h-full block">
            <rect width="30" height="20" fill="#DE2910" />
            {/* Main star */}
            <polygon
              points="5,2 6.2,5.6 10,5.6 6.9,7.8 8.1,11.4 5,9.2 1.9,11.4 3.1,7.8 0,5.6 3.8,5.6"
              fill="#FFDE00"
              transform="scale(0.85) translate(1, 0.5)"
            />
            {/* Small stars */}
            <circle cx="10" cy="2" r="0.9" fill="#FFDE00" />
            <circle cx="12" cy="4" r="0.9" fill="#FFDE00" />
            <circle cx="12" cy="7" r="0.9" fill="#FFDE00" />
            <circle cx="10" cy="9" r="0.9" fill="#FFDE00" />
          </svg>
        );

      case 'cd':
      case 'rdc':
        // Democratic Republic of Congo: Sky blue, red diagonal stripe bordered with yellow, yellow star
        return (
          <svg viewBox="0 0 4 3" className="w-full h-full block">
            <rect width="4" height="3" fill="#007FFF" />
            <polygon points="0,2.5 0,3 0.67,3 4,0.5 4,0 3.33,0" fill="#FCD116" />
            <polygon points="0,2.65 0,3 0.45,3 4,0.35 4,0 3.55,0" fill="#CE1126" />
            <polygon
              points="0.7,0.3 0.8,0.6 1.1,0.6 0.85,0.8 0.95,1.1 0.7,0.9 0.45,1.1 0.55,0.8 0.3,0.6 0.6,0.6"
              fill="#FCD116"
            />
          </svg>
        );

      default:
        return (
          <span className="w-full h-full bg-slate-200 text-[10px] font-bold flex items-center justify-center text-slate-700">
            {code.toUpperCase().slice(0, 2)}
          </span>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-xs border border-black/15 shadow-xs align-middle ${className}`}
      style={{ aspectRatio: '3/2' }}
      aria-hidden="true"
    >
      {renderFlagSvg()}
    </span>
  );
};
