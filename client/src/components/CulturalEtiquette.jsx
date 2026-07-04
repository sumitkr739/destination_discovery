import { motion } from 'framer-motion';
import { Heart, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './Card';

export function CulturalEtiquette({ etiquette }) {
  if (!etiquette || etiquette.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Cultural Etiquette</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {etiquette.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 rounded-xl p-5 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">{item.category}</h3>
            
            <div className="space-y-4">
              {item.dos && item.dos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Do's</span>
                  </div>
                  <ul className="space-y-1 ml-7">
                    {item.dos.map((doItem, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{doItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.donts && item.donts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-700">Don'ts</span>
                  </div>
                  <ul className="space-y-1 ml-7">
                    {item.donts.map((dontItem, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>{dontItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
