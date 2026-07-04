import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Compass } from 'lucide-react';
import { Card } from './Card';

export function FoodPassport({ foodPassport }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!foodPassport) return null;

  const sections = [
    { title: 'Signature Dishes', data: foodPassport.signature, icon: '🍽️', color: 'from-cyan-400 to-blue-500' },
    { title: 'Street Food', data: foodPassport.street, icon: '🥘', color: 'from-amber-400 to-orange-500' },
    { title: 'Drinks', data: foodPassport.drinks, icon: '🍹', color: 'from-purple-400 to-indigo-500' },
    { title: 'Sweet Treats', data: foodPassport.sweetTreats, icon: '🧁', color: 'from-pink-400 to-rose-500' },
  ].filter(s => s.data && s.data.length > 0);

  if (sections.length === 0) return null;

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8B5CF6]/10 rounded-xl text-[#8B5CF6] border border-[#8B5CF6]/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">Local Food Passport</h2>
            <p className="text-xs text-gray-400 font-light">Gastronomic secrets and traditional bites to sample</p>
          </div>
        </div>
      </div>

      {/* Tabs Selector Header */}
      <div className="flex border-b border-white/5 overflow-x-auto gap-2 pb-px mb-6 scrollbar-none">
        {sections.map((section, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`relative px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 select-none whitespace-nowrap ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6EE7F9] to-[#8B5CF6]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {sections[activeTab].data.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#17181C]/50 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-semibold text-sm tracking-wide text-white">
                      {item.dish || item.drink || item.item}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-light border-t border-white/5 pt-2 mt-1">
                  <span className="text-[#8B5CF6]">📍</span>
                  <span className="truncate">{item.where}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}

