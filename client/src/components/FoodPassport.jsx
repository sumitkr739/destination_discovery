import { motion } from 'framer-motion';
import { UtensilsCrossed, Coffee, Cookie } from 'lucide-react';
import { Card } from './Card';

export function FoodPassport({ foodPassport }) {
  if (!foodPassport) return null;

  const sections = [
    { title: 'Signature Dishes', data: foodPassport.signature, icon: '🍽️', color: 'from-red-500 to-orange-500' },
    { title: 'Street Food', data: foodPassport.street, icon: '🥘', color: 'from-yellow-500 to-amber-500' },
    { title: 'Drinks', data: foodPassport.drinks, icon: '🍹', color: 'from-blue-500 to-cyan-500' },
    { title: 'Sweet Treats', data: foodPassport.sweetTreats, icon: '🧁', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
          <UtensilsCrossed className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Local Food Passport</h2>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIdx) => (
          section.data && section.data.length > 0 && (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/60 rounded-xl p-4 hover:bg-white/90 transition-all duration-300 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{item.dish || item.drink || item.item}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${section.color} text-white`}>
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      📍 {item.where}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        ))}
      </div>
    </Card>
  );
}
