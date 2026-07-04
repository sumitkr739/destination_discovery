import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-4 mb-8 pt-6"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6EE7F9]/20 bg-[#6EE7F9]/5 text-[#6EE7F9] text-xs font-semibold tracking-wider uppercase mb-2">
        <Sparkles size={12} className="animate-pulse" />
        AI-Powered Cultural Travel
      </div>
      
      <div className="space-y-3">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-[#6EE7F9]/80 bg-clip-text text-transparent">
          CultureLens AI
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-normal max-w-xl mx-auto tracking-normal">
          Unveil the soul of your destination. Experience authentic stories, hidden gems, and cultural rituals handcrafted by AI.
        </p>
      </div>
    </motion.div>
  );
}

