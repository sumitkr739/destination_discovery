import { motion } from 'framer-motion';
import { PartyPopper, Calendar } from 'lucide-react';
import { Card } from './Card';

export function FestivalsCard({ festivals }) {
  if (!festivals || festivals.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
          <PartyPopper className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Festivals & Events</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {festivals.map((festival, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800">{festival.name}</h3>
              <span className="text-3xl">🎉</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600">{festival.month}</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {festival.description}
            </p>
            
            <div className="bg-white/70 rounded-lg p-3 border-l-4 border-orange-500">
              <p className="text-xs font-semibold text-gray-600 mb-1">What to Expect:</p>
              <p className="text-sm text-gray-700">{festival.experience}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
