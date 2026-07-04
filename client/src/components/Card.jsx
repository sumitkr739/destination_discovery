import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '../utils/cn';

export function Card({ className, children, glass = true, hover = true, animate = true, ...props }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const cardStyle = glass 
    ? 'glass-premium border-white/[0.08] text-white' 
    : 'bg-[#17181C] border-white/[0.06] text-white';

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4 } : {}}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-[24px] border p-6 transition-all duration-300 shadow-2xl',
        cardStyle,
        className
      )}
      {...props}
    >
      {/* Hover glow effect (Vercel style) */}
      {hover && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(110, 231, 249, 0.08),
                transparent 80%
              )
            `,
          }}
        />
      )}
      
      {/* Top subtle liquid edge reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

