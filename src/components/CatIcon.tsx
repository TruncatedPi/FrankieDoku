import React from 'react';
import { CatBreed } from '../engine/types';
import frankieImg from '../assets/frankie.png';
import frankieShockedImg from '../assets/frankie-shocked.png';
import frankieReimaginedImg from '../assets/frankie-reimagined.png';
import frankieReimaginedShockedImg from '../assets/frankie-reimagined-shocked.png';

interface CatIconProps {
  breed?: CatBreed;
  expression?: 'happy' | 'neutral' | 'shocked' | 'sleepy';
  className?: string;
  hasConflict?: boolean;
}

export const CatIcon: React.FC<CatIconProps> = ({
  breed = 'frankie',
  expression = 'happy',
  className = 'w-full h-full',
  hasConflict = false,
}) => {
  const isShocked = hasConflict || expression === 'shocked';
  const effectiveExpression = hasConflict ? 'shocked' : expression;

  // Real-photo / custom avatar Frankie options
  if (breed === 'frankie' || breed === 'frankie_reimagined') {
    const isReimagined = breed === 'frankie_reimagined';
    const happySrc = isReimagined ? frankieReimaginedImg : frankieImg;
    const shockedSrc = isReimagined ? frankieReimaginedShockedImg : frankieShockedImg;

    return (
      <div
        className={`relative ${className} flex items-center justify-center select-none pointer-events-none transition-transform duration-200 ${
          hasConflict ? 'animate-wiggle' : ''
        }`}
      >
        <img
          src={isShocked ? shockedSrc : happySrc}
          alt={isShocked ? 'Frankie shocked' : 'Frankie happy'}
          className={`w-full h-full object-contain rounded-full drop-shadow-md ${
            isShocked ? 'ring-2 ring-rose-500 shadow-rose-400/50' : ''
          }`}
          draggable={false}
        />
        {isShocked && (
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-sm">
            !
          </div>
        )}
      </div>
    );
  }

  // Chill Capybara with Zen Yuzu on Head
  if (breed === 'capybara') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-200 ${hasConflict ? 'animate-wiggle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="capyShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#capyShadow)">
          {/* Ears */}
          <ellipse cx="23" cy="38" rx="6.5" ry="5" fill="#784e2d" transform="rotate(-15 23 38)" />
          <ellipse cx="23" cy="38" rx="3.5" ry="2.5" fill="#c49a6c" transform="rotate(-15 23 38)" />
          <ellipse cx="77" cy="38" rx="6.5" ry="5" fill="#784e2d" transform="rotate(15 77 38)" />
          <ellipse cx="77" cy="38" rx="3.5" ry="2.5" fill="#c49a6c" transform="rotate(15 77 38)" />

          {/* Head */}
          <rect x="23" y="32" width="54" height="52" rx="24" fill="#a47248" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.5" />
          
          {/* Snout */}
          <rect x="30" y="52" width="40" height="30" rx="16" fill="#885a34" />
          <ellipse cx="44" cy="62" rx="2.5" ry="1.5" fill="#382110" />
          <ellipse cx="56" cy="62" rx="2.5" ry="1.5" fill="#382110" />
          <path d="M46,72 Q50,75 54,72" stroke="#382110" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          {effectiveExpression === 'shocked' ? (
            <g>
              <circle cx="39" cy="46" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="61" cy="46" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="39" cy="46" r="3" fill="#ef4444" />
              <circle cx="61" cy="46" r="3" fill="#ef4444" />
            </g>
          ) : effectiveExpression === 'neutral' ? (
            <g>
              <ellipse cx="39" cy="46" rx="4" ry="4.5" fill="#382110" />
              <ellipse cx="61" cy="46" rx="4" ry="4.5" fill="#382110" />
              <circle cx="40.5" cy="45" r="1.5" fill="#ffffff" />
              <circle cx="62.5" cy="45" r="1.5" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <path d="M33,46 Q39,50 45,46" stroke="#382110" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M55,46 Q61,50 67,46" stroke="#382110" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Blush */}
          <ellipse cx="27" cy="56" rx="4.5" ry="3" fill="#f43f5e" opacity="0.35" />
          <ellipse cx="73" cy="56" rx="4.5" ry="3" fill="#f43f5e" opacity="0.35" />

          {/* Zen Yuzu / Orange on Head */}
          <circle cx="50" cy="23" r="10" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
          <path d="M50,13 C50,10 52,9 52,9" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M52,10 Q58,7 60,12 Q55,15 52,10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }

  // Derpy Shiba with squishy cheeks and tongue blep
  if (breed === 'shiba') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-200 ${hasConflict ? 'animate-wiggle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shibaShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#shibaShadow)">
          {/* Ears */}
          <polygon points="18,46 25,12 47,30" fill="#ea8c38" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.5" />
          <polygon points="23,41 28,20 42,32" fill="#fed7aa" />
          <polygon points="82,46 75,12 53,30" fill="#ea8c38" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.5" />
          <polygon points="77,41 72,20 58,32" fill="#fed7aa" />

          {/* Head Base */}
          <ellipse cx="50" cy="56" rx="35" ry="30" fill="#ea8c38" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.5" />

          {/* Eyebrows (Maro Spots) */}
          <ellipse cx="38" cy="41" rx="3.5" ry="2.5" fill="#fffbf5" />
          <ellipse cx="62" cy="41" rx="3.5" ry="2.5" fill="#fffbf5" />

          {/* White Urajiro / Cheeks */}
          <path d="M20,54 Q34,46 50,56 Q66,46 80,54 Q82,78 50,82 Q18,78 20,54 Z" fill="#fffbf5" />

          {/* Nose */}
          <polygon points="50,60 45,55 55,55" fill="#1e1e1e" />

          {/* Mouth & Tongue Blep */}
          <path d="M47,63 Q50,75 55,74 Q58,73 56,63 Z" fill="#f43f5e" />
          <line x1="51.5" y1="64" x2="51.5" y2="70" stroke="#be123c" strokeWidth="1" strokeLinecap="round" />
          <path d="M50,60 Q44,65 41,62 M50,60 Q56,65 59,62" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Blush */}
          <ellipse cx="27" cy="58" rx="4.5" ry="3" fill="#f43f5e" opacity="0.35" />
          <ellipse cx="73" cy="58" rx="4.5" ry="3" fill="#f43f5e" opacity="0.35" />

          {/* Eyes */}
          {effectiveExpression === 'shocked' ? (
            <g>
              <circle cx="38" cy="49" r="7.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="62" cy="49" r="7.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="38" cy="49" r="3" fill="#ef4444" />
              <circle cx="62" cy="49" r="3" fill="#ef4444" />
            </g>
          ) : effectiveExpression === 'neutral' ? (
            <g>
              <circle cx="38" cy="49" r="4.5" fill="#1e293b" />
              <circle cx="62" cy="49" r="4.5" fill="#1e293b" />
              <circle cx="39.5" cy="47.5" r="1.5" fill="#ffffff" />
              <circle cx="63.5" cy="47.5" r="1.5" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <path d="M33,50 Q40,44 45,50" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M55,50 Q60,44 67,50" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>
      </svg>
    );
  }

  // Goofy Axolotl with coral feathery gills
  if (breed === 'axolotl') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-200 ${hasConflict ? 'animate-wiggle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="axolotlShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#axolotlShadow)">
          {/* Gills */}
          <g fill="#f43f5e">
            <path d="M22,44 Q8,37 4,42 Q8,47 20,48 Z" />
            <path d="M20,52 Q5,50 2,56 Q7,61 19,57 Z" />
            <path d="M22,60 Q10,65 6,71 Q12,74 24,65 Z" />
            <path d="M78,44 Q92,37 96,42 Q92,47 80,48 Z" />
            <path d="M80,52 Q95,50 98,56 Q93,61 81,57 Z" />
            <path d="M78,60 Q90,65 94,71 Q88,74 76,65 Z" />
          </g>
          <circle cx="4" cy="42" r="3" fill="#fb7185" />
          <circle cx="2" cy="56" r="3" fill="#fb7185" />
          <circle cx="6" cy="71" r="3" fill="#fb7185" />
          <circle cx="96" cy="42" r="3" fill="#fb7185" />
          <circle cx="98" cy="56" r="3" fill="#fb7185" />
          <circle cx="94" cy="71" r="3" fill="#fb7185" />

          {/* Head */}
          <ellipse cx="50" cy="56" rx="35" ry="28" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />

          {/* Bubbles */}
          <circle cx="15" cy="28" r="3" fill="#67e8f9" opacity="0.6" stroke="#38bdf8" strokeWidth="0.8" />
          <circle cx="85" cy="27" r="2.5" fill="#67e8f9" opacity="0.6" stroke="#38bdf8" strokeWidth="0.8" />
          <circle cx="88" cy="18" r="1.5" fill="#67e8f9" opacity="0.5" />

          {/* Cheeks */}
          <ellipse cx="27" cy="58" rx="5" ry="3" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="73" cy="58" rx="5" ry="3" fill="#f43f5e" opacity="0.45" />

          {/* Mouth :3 */}
          <path d="M43,62 Q47,66 50,62 Q53,66 57,62" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          {effectiveExpression === 'shocked' ? (
            <g>
              <circle cx="34" cy="52" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="66" cy="52" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="34" cy="52" r="3" fill="#ef4444" />
              <circle cx="66" cy="52" r="3" fill="#ef4444" />
            </g>
          ) : effectiveExpression === 'sleepy' ? (
            <g>
              <path d="M30,52 Q35,56 40,52" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M60,52 Q65,56 70,52" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              <circle cx="34" cy="52" r="4.5" fill="#0f172a" />
              <circle cx="66" cy="52" r="4.5" fill="#0f172a" />
              <circle cx="35.5" cy="50.5" r="1.5" fill="#ffffff" />
              <circle cx="67.5" cy="50.5" r="1.5" fill="#ffffff" />
            </g>
          )}
        </g>
      </svg>
    );
  }

  // Derpy Frog with giant eyes and silly grin
  if (breed === 'frog') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-200 ${hasConflict ? 'animate-wiggle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="frogShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#frogShadow)">
          {/* Eye Bumps */}
          <circle cx="31" cy="34" r="15" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
          <circle cx="69" cy="34" r="15" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />

          {/* Head Base */}
          <ellipse cx="50" cy="59" rx="38" ry="27" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />

          {/* Pale Belly / Throat */}
          <ellipse cx="50" cy="73" rx="22" ry="12" fill="#fef08a" />

          {/* Eye Whites */}
          <circle cx="31" cy="34" r="11" fill="#ffffff" />
          <circle cx="69" cy="34" r="11" fill="#ffffff" />

          {/* Pupils */}
          {effectiveExpression === 'shocked' ? (
            <g>
              <circle cx="31" cy="34" r="4" fill="#ef4444" />
              <circle cx="69" cy="34" r="4" fill="#ef4444" />
              <circle cx="31" cy="34" r="2" fill="#ffffff" />
              <circle cx="69" cy="34" r="2" fill="#ffffff" />
            </g>
          ) : effectiveExpression === 'sleepy' ? (
            <g>
              <path d="M24,34 Q31,38 38,34" stroke="#166534" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M62,34 Q69,38 76,34" stroke="#166534" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : effectiveExpression === 'neutral' ? (
            <g>
              <circle cx="31" cy="34" r="5" fill="#0f172a" />
              <circle cx="69" cy="34" r="5" fill="#0f172a" />
              <circle cx="32.5" cy="32.5" r="1.5" fill="#ffffff" />
              <circle cx="70.5" cy="32.5" r="1.5" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <circle cx="32" cy="34" r="6.5" fill="#166534" />
              <circle cx="32" cy="34" r="4" fill="#0f172a" />
              <circle cx="34" cy="32" r="1.8" fill="#ffffff" />
              <circle cx="68" cy="34" r="6.5" fill="#166534" />
              <circle cx="68" cy="34" r="4" fill="#0f172a" />
              <circle cx="70" cy="32" r="1.8" fill="#ffffff" />
            </g>
          )}

          {/* Nostrils */}
          <circle cx="47" cy="54" r="1.3" fill="#166534" />
          <circle cx="53" cy="54" r="1.3" fill="#166534" />

          {/* Big Wide Smile */}
          <path d="M24,58 Q50,75 76,58" stroke="#166534" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Blush */}
          <ellipse cx="25" cy="56" rx="5" ry="3" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="75" cy="56" rx="5" ry="3" fill="#f43f5e" opacity="0.4" />
        </g>
      </svg>
    );
  }

  // Chubby Hamster with stuffed seed cheeks
  if (breed === 'hamster') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-200 ${hasConflict ? 'animate-wiggle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="hamsterShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g filter="url(#hamsterShadow)">
          {/* Ears */}
          <ellipse cx="23" cy="33" rx="8" ry="7" fill="#e2a569" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.2" />
          <ellipse cx="23" cy="33" rx="4.5" ry="4" fill="#fca5a5" />
          <ellipse cx="77" cy="33" rx="8" ry="7" fill="#e2a569" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.2" />
          <ellipse cx="77" cy="33" rx="4.5" ry="4" fill="#fca5a5" />

          {/* Head Base */}
          <ellipse cx="50" cy="57" rx="36" ry="30" fill="#e2a569" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.5" />

          {/* Giant Puffy Cheeks */}
          <ellipse cx="25" cy="62" rx="14" ry="12" fill="#fffaf0" stroke="#000000" strokeOpacity="0.08" strokeWidth="1" />
          <ellipse cx="75" cy="62" rx="14" ry="12" fill="#fffaf0" stroke="#000000" strokeOpacity="0.08" strokeWidth="1" />
          <ellipse cx="50" cy="66" rx="18" ry="14" fill="#fffaf0" />

          {/* Blush */}
          <ellipse cx="23" cy="61" rx="4.5" ry="3" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="77" cy="61" rx="4.5" ry="3" fill="#f43f5e" opacity="0.45" />

          {/* Nose & Buck Teeth */}
          <polygon points="50,57 46,53 54,53" fill="#f43f5e" />
          <rect x="47.2" y="61" width="2.6" height="4" rx="0.8" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" />
          <rect x="50.2" y="61" width="2.6" height="4" rx="0.8" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" />

          {/* Whiskers */}
          <g stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round">
            <line x1="26" y1="62" x2="10" y2="60" />
            <line x1="26" y1="66" x2="11" y2="68" />
            <line x1="74" y1="62" x2="90" y2="60" />
            <line x1="74" y1="66" x2="89" y2="68" />
          </g>

          {/* Eyes */}
          {effectiveExpression === 'shocked' ? (
            <g>
              <circle cx="37" cy="48" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="63" cy="48" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
              <circle cx="37" cy="48" r="3" fill="#ef4444" />
              <circle cx="63" cy="48" r="3" fill="#ef4444" />
            </g>
          ) : effectiveExpression === 'sleepy' ? (
            <g>
              <path d="M33,48 Q37,52 41,48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M59,48 Q63,52 67,48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              <circle cx="37" cy="48" r="4.5" fill="#1e293b" />
              <circle cx="63" cy="48" r="4.5" fill="#1e293b" />
              <circle cx="38.5" cy="46.5" r="1.6" fill="#ffffff" />
              <circle cx="64.5" cy="46.5" r="1.6" fill="#ffffff" />
            </g>
          )}
        </g>
      </svg>
    );
  }

  // Classic Cat Breeds: Ginger Tabby, Calico, Tuxedo, Siamese, Black Cat, Russian Gray
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
