import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-6 mb-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <div className="relative">
          <Compass className="w-20 h-20 text-blue-600 mx-auto" />
          <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
          CultureLens AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          Discover Places Like a <span className="text-blue-600 font-bold">Local</span>
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Experience authentic culture, hidden gems, and local stories powered by AI.
          Your journey beyond ordinary travel begins here.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
          <span className="text-2xl">🗺️</span>
          <span>Hidden Gems</span>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
          <span className="text-2xl">🍜</span>
          <span>Local Food</span>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
          <span className="text-2xl">🎭</span>
          <span>Cultural Experiences</span>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
          <span className="text-2xl">✨</span>
          <span>AI-Powered</span>
        </div>
      </div>
    </motion.div>
  );
}
