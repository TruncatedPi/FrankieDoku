import React from 'react';
import { CatBreed } from '../engine/types';

interface CatIconProps {
  breed?: CatBreed;
  expression?: 'happy' | 'neutral' | 'shocked' | 'sleepy';
  className?: string;
  hasConflict?: boolean;
}

export const CatIcon: React.FC<CatIconProps> = ({
  breed = 'orange_tabby',
  expression = 'happy',
  className = 'w-full h-full',
  hasConflict = false,
}) => {
  // Breed styling palettes
  const getBreedColors = () => {
    switch (breed) {
      case 'calico':
        return {
          body: '#fdfbf7',
          earOuter: '#fdfbf7',
          earInner: '#fca5a5',
          patch1: '#ea580c', // Orange patch
          patch2: '#44403c', // Dark patch
          eyeColor: '#65a30d', // Hazel/green
          nose: '#f43f5e',
        };
      case 'tuxedo':
        return {
          body: '#1e293b',
          chest: '#ffffff',
          earOuter: '#1e293b',
          earInner: '#fca5a5',
          eyeColor: '#eab308', // Amber
          nose: '#f43f5e',
        };
      case 'siamese':
        return {
          body: '#f5ebe0',
          earOuter: '#582f0e',
          earInner: '#d4a373',
          mask: '#582f0e',
          eyeColor: '#38bdf8', // Piercing blue
          nose: '#3d2614',
        };
      case 'black_cat':
        return {
          body: '#18181b',
          earOuter: '#18181b',
          earInner: '#3f3f46',
          eyeColor: '#facc15', // Gold
          nose: '#27272a',
        };
      case 'gray_fluff':
        return {
          body: '#94a3b8',
          earOuter: '#94a3b8',
          earInner: '#cbd5e1',
          eyeColor: '#4ade80', // Emerald green
          nose: '#64748b',
        };
      case 'orange_tabby':
      default:
        return {
          body: '#fb923c',
          stripes: '#ea580c',
          earOuter: '#fb923c',
          earInner: '#fca5a5',
          eyeColor: '#15803d', // Warm olive green
          nose: '#f43f5e',
        };
    }
  };

  const colors = getBreedColors();
  const effectiveExpression = hasConflict ? 'shocked' : expression;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-transform duration-200 ${
        hasConflict ? 'animate-wiggle' : ''
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="catShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#catShadow)">
        {/* Left Ear */}
        <polygon
          points="20,48 28,14 48,32"
          fill={colors.earOuter}
          stroke="#000000"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />
        <polygon points="25,43 30,22 43,33" fill={colors.earInner} />

        {/* Right Ear */}
        <polygon
          points="80,48 72,14 52,32"
          fill={colors.earOuter}
          stroke="#000000"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />
        <polygon points="75,43 70,22 57,33" fill={colors.earInner} />

        {/* Head Base */}
        <ellipse
          cx="50"
          cy="56"
          rx="34"
          ry="29"
          fill={colors.body}
          stroke="#000000"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />

        {/* Breed Specific Markings */}
        {breed === 'orange_tabby' && (
          <g fill={colors.stripes}>
            <polygon points="50,30 46,38 54,38" />
            <polygon points="38,34 36,41 42,40" />
            <polygon points="62,34 64,41 58,40" />
          </g>
        )}

        {breed === 'calico' && (
          <g>
            {/* Orange patch over right eye/ear */}
            <path
              d="M56,32 Q74,30 78,48 Q70,62 58,54 Z"
              fill={colors.patch1}
            />
            {/* Dark patch over left cheek */}
            <path
              d="M20,52 Q28,66 40,64 Q32,48 22,46 Z"
              fill={colors.patch2}
            />
          </g>
        )}

        {breed === 'siamese' && (
          <g>
            {/* Dark facial mask */}
            <ellipse cx="50" cy="56" rx="20" ry="17" fill={colors.mask} />
          </g>
        )}

        {breed === 'tuxedo' && (
          <g>
            {/* White muzzle and chest triangle */}
            <path
              d="M42,52 Q50,48 58,52 Q62,68 50,78 Q38,68 42,52 Z"
              fill="#ffffff"
            />
          </g>
        )}

        {/* Eyes based on expression */}
        {effectiveExpression === 'happy' && (
          <g stroke={breed === 'black_cat' || breed === 'siamese' ? '#ffffff' : '#334155'} strokeWidth="3" strokeLinecap="round">
            {/* Curved happy smiling eyes */}
            <path d="M33,52 Q40,46 45,52" />
            <path d="M55,52 Q60,46 67,52" />
          </g>
        )}

        {effectiveExpression === 'shocked' && (
          <g>
            {/* Wide alarmed eyes */}
            <circle cx="38" cy="50" r="8" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
            <circle cx="62" cy="50" r="8" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
            <circle cx="38" cy="50" r="3" fill="#ef4444" />
            <circle cx="62" cy="50" r="3" fill="#ef4444" />
          </g>
        )}

        {effectiveExpression === 'sleepy' && (
          <g stroke="#475569" strokeWidth="2.5" strokeLinecap="round">
            <path d="M33,52 Q39,56 45,52" />
            <path d="M55,52 Q61,56 67,52" />
          </g>
        )}

        {effectiveExpression === 'neutral' && (
          <g>
            <circle cx="38" cy="52" r="5" fill={colors.eyeColor} />
            <circle cx="62" cy="52" r="5" fill={colors.eyeColor} />
            <circle cx="39" cy="51" r="1.5" fill="#ffffff" />
            <circle cx="63" cy="51" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Pink Cheek Blush */}
        {effectiveExpression === 'happy' && (
          <g fill="#f43f5e" opacity="0.45">
            <ellipse cx="28" cy="59" rx="4.5" ry="3" />
            <ellipse cx="72" cy="59" rx="4.5" ry="3" />
          </g>
        )}

        {/* Nose */}
        <polygon
          points="50,60 46,56 54,56"
          fill={colors.nose}
        />

        {/* Cute Mouth (W-shape) */}
        <path
          d="M50,60 Q50,65 46,65 Q42,65 42,62 M50,60 Q50,65 54,65 Q58,65 58,62"
          stroke={breed === 'black_cat' || (breed === 'siamese' && effectiveExpression !== 'shocked') ? '#e2e8f0' : '#475569'}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Whiskers */}
        <g stroke={breed === 'black_cat' ? '#ffffff' : '#64748b'} strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
          <line x1="30" y1="58" x2="16" y2="55" />
          <line x1="30" y1="62" x2="17" y2="65" />
          <line x1="70" y1="58" x2="84" y2="55" />
          <line x1="70" y1="62" x2="83" y2="65" />
        </g>
      </g>
    </svg>
  );
};
