import { motion } from 'framer-motion';
import { Backpack } from 'lucide-react';
import { Card } from './Card';

export function PackingCard({ packingList }) {
  if (!packingList) return null;

  const sections = [
    { title: 'Essentials', data: packingList.essentials, icon: '⭐', color: 'red' },
    { title: 'Clothing', data: packingList.clothing, icon: '👕', color: 'blue' },
    { title: 'Tech & Gadgets', data: packingList.tech, icon: '📱', color: 'purple' },
    { title: 'Optional', data: packingList.optional, icon: '💼', color: 'gray' },
  ];

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl">
          <Backpack className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Smart Packing List</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, sectionIdx) => (
          section.data && section.data.length > 0 && (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="bg-white/60 rounded-xl p-5 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.data.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        ))}
      </div>
    </Card>
  );
}
