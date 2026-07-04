import { useState } from 'react';
import { Backpack, Check } from 'lucide-react';
import { Card } from './Card';

export function PackingCard({ packingList }) {
  const [checkedItems, setCheckedItems] = useState({});

  if (!packingList) return null;

  const sections = [
    { title: 'Essentials', data: packingList.essentials, icon: '⭐' },
    { title: 'Clothing', data: packingList.clothing, icon: '👕' },
    { title: 'Tech & Gadgets', data: packingList.tech, icon: '📱' },
    { title: 'Optional', data: packingList.optional, icon: '💼' },
  ].filter(s => s.data && s.data.length > 0);

  const toggleCheck = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8B5CF6]/10 rounded-xl text-[#8B5CF6] border border-[#8B5CF6]/20">
          <Backpack className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Smart Packing Checklist</h2>
          <p className="text-xs text-gray-400 font-light">Custom gear suggested based on travel duration</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section, sIdx) => (
          <div
            key={sIdx}
            className="bg-[#17181C]/50 border border-white/5 rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 flex items-center gap-2">
              <span className="text-xl select-none">{section.icon}</span>
              <span>{section.title}</span>
            </h3>
            
            <ul className="space-y-3">
              {section.data.map((item, idx) => {
                const key = `${sIdx}-${idx}`;
                const isChecked = !!checkedItems[key];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleCheck(sIdx, idx)}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                      isChecked 
                        ? 'bg-[#6EE7F9] border-[#6EE7F9] text-black' 
                        : 'border-white/20 group-hover:border-white/40'
                    }`}>
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </div>
                    <span className={`text-xs transition-all duration-200 ${
                      isChecked 
                        ? 'text-gray-500 line-through' 
                        : 'text-gray-300 group-hover:text-white font-light'
                    }`}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

