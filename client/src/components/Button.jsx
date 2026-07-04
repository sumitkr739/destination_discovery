import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export function Button({ className, children, variant = 'primary', size = 'md', disabled = false, ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#6EE7F9] to-[#8B5CF6] text-black font-semibold shadow-[0_4px_20px_0_rgba(110,231,249,0.25)] hover:shadow-[0_4px_30px_0_rgba(110,231,249,0.4)] border-none',
    secondary: 'bg-[#17181C] hover:bg-[#24252a] text-white border border-white/10 shadow-lg',
    outline: 'border border-white/20 text-white hover:bg-white/5',
    ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4.5 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={cn(
        'rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

