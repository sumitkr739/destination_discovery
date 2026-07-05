import { Gift, MapPin, Tag } from 'lucide-react';
import { Card } from './Card';

export function SouvenirsCard({ souvenirs }) {
  if (!souvenirs || souvenirs.length === 0) return null;

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#6EE7F9]/10 rounded-xl text-[#6EE7F9] border border-[#6EE7F9]/20">
          <Gift className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Authentic Souvenirs</h2>
          <p className="text-xs text-gray-400 font-light">Unique local items, relics, and crafts to bring home</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {souvenirs.map((souvenir, idx) => (
          <div
            key={idx}
            className="bg-[#17181C]/50 border border-white/5 rounded-2xl p-5 hover:border-[#6EE7F9]/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="text-center mb-4 p-4 bg-[#09090B]/50 rounded-2xl border border-white/5 relative overflow-hidden group">
                <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(110,231,249,0.3)] block transition-transform group-hover:scale-110 duration-300">
                  🎁
                </span>
              </div>
              
              <h3 className="text-sm font-semibold tracking-wide text-white mb-2 text-center">
                {souvenir.item}
              </h3>
              
              <p className="text-gray-400 text-xs font-light leading-relaxed mb-4 text-center">
                {souvenir.description}
              </p>
            </div>
            
            <div className="space-y-2 pt-3 border-t border-white/5 text-[10px] text-gray-400">
              <div className="flex items-start gap-1.5 leading-normal">
                <MapPin size={12} className="text-[#6EE7F9] flex-shrink-0 mt-0.5" />
                <span className="truncate">{souvenir.where}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag size={12} className="text-[#8B5CF6] flex-shrink-0" />
                <span className="font-semibold text-gray-300">{souvenir.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

