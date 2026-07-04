import { motion } from 'framer-motion';
import { Gift, MapPin, DollarSign } from 'lucide-react';
import { Card } from './Card';

export function SouvenirsCard({ souvenirs }) {
  if (!souvenirs || souvenirs.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Authentic Souvenirs</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {souvenirs.map((souvenir, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 rounded-xl p-5 hover:bg-white/90 transition-all duration-300 border border-gray-200 hover:shadow-md"
          >
            <div className="text-center mb-3">
              <span className="text-4xl">🎁</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
              {souvenir.item}
            </h3>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {souvenir.description}
            </p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={14} />
                <span>{souvenir.where}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <DollarSign size={14} />
                <span className="font-semibold">{souvenir.priceRange}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
