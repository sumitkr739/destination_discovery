import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export function Card({ className, children, glass = false, hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        'rounded-2xl p-6 shadow-lg transition-all duration-300',
        glass ? 'glass' : 'bg-white border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
