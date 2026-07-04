import { motion } from 'framer-motion';
import { MapPin, Clock, Tag } from 'lucide-react';
import { Card } from './Card';

export function HiddenGemsCard({ gems }) {
  if (!gems || gems.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Hidden Gems</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {gems.map((gem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/50 rounded-xl p-5 hover:bg-white/80 transition-all duration-300 border border-gray-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">{gem.name}</h3>
              <span className="text-2xl">{getCategoryEmoji(gem.category)}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {gem.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <Tag size={12} />
                <span>{gem.category}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <Clock size={12} />
                <span>{gem.bestTime}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function getCategoryEmoji(category) {
  const categories = {
    'Cultural': '🎭',
    'Nature': '🌿',
    'Food': '🍜',
    'History': '🏛️',
    'Entertainment': '🎪',
    'Art': '🎨',
    'Adventure': '🏔️',
    'default': '✨'
  };
  return categories[category] || categories.default;
}
