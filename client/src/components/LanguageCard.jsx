import { motion } from 'framer-motion';
import { MessageCircle, Volume2 } from 'lucide-react';
import { Card } from './Card';

export function LanguageCard({ phrases }) {
  if (!phrases || phrases.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Essential Phrases</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phrases.map((phrase, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">💬</span>
              <Volume2 className="w-4 h-4 text-blue-600" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {phrase.phrase}
            </h3>
            
            <p className="text-sm text-blue-700 font-mono mb-2">
              {phrase.pronunciation}
            </p>
            
            <p className="text-xs text-gray-600 italic">
              {phrase.meaning}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
