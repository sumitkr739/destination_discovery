import { motion } from 'framer-motion';
import { Sparkles, Clock, Tag } from 'lucide-react';
import { Card } from './Card';

export function HiddenGemsCard({ gems }) {
  if (!gems || gems.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Hidden Gems</h2>
          <p className="text-xs text-gray-400 font-light">Off the beaten track sites favored by local experts</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {gems.map((gem, idx) => (
          <Card 
            key={idx} 
            glass 
            hover 
            animate={false} // animations handled by parent container transitions
            className="bg-[#111214]/65 border-white/[0.08] hover:border-emerald-500/30 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold tracking-wide text-white">{gem.name}</h3>
                <span className="text-xl select-none">{getCategoryEmoji(gem.category)}</span>
              </div>
              <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
                {gem.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                <Tag size={10} className="text-emerald-400" />
                <span>{gem.category}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                <Clock size={10} className="text-amber-400" />
                <span>{gem.bestTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
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

