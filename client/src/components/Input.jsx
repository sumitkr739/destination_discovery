import { cn } from '../utils/cn';

export function Input({ className, label, error, icon: Icon, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2 font-medium tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#6EE7F9]">
            <Icon size={20} />
          </div>
        )}
        <input
          className={cn(
            'w-full rounded-full border border-white/10 bg-[#111214]/60 backdrop-blur-md px-5 py-3.5 text-white placeholder-gray-500 transition-all duration-300 focus:border-[#6EE7F9]/50 focus:outline-none focus:ring-4 focus:ring-[#6EE7F9]/10',
            Icon && 'pl-12',
            error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-medium pl-3">{error}</p>
      )}
    </div>
  );
}

