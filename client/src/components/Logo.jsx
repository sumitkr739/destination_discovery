import { Compass } from 'lucide-react';

export function BrandLogo({ size = 'md', animate = false, suffix = '' }) {
  const containerSize = size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl';
  const iconSize = size === 'sm' ? 16 : 22;
  const textSize = size === 'sm' ? 'text-xs' : 'text-lg';

  return (
    <div className="inline-flex items-center gap-2.5">
      <div className={`${containerSize} bg-gradient-to-br from-[#6EE7F9] to-[#8B5CF6] flex items-center justify-center shadow-lg flex-shrink-0`}>
        <Compass 
          size={iconSize} 
          className={`text-black ${animate ? 'animate-spin-slow' : ''}`} 
        />
      </div>
      <span className={`font-semibold ${textSize} tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-1.5`}>
        <span>CULTURELENS</span>
        {suffix && <span className="hidden md:inline opacity-80 font-normal">{suffix}</span>}
      </span>
    </div>
  );
}
