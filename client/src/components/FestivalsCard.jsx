import { PartyPopper, Calendar } from 'lucide-react';
import { Card } from './Card';

export function FestivalsCard({ festivals }) {
  if (!festivals || festivals.length === 0) return null;

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
          <PartyPopper className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Festivals & Celebrations</h2>
          <p className="text-xs text-gray-400 font-light">Spectacular local gatherings, rituals, and seasonal events</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {festivals.map((festival, idx) => (
          <div
            key={idx}
            className="bg-[#17181C]/50 border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold tracking-wide text-white">{festival.name}</h3>
                <span className="text-xl select-none">🎉</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{festival.month}</span>
              </div>
              
              <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
                {festival.description}
              </p>
            </div>
            
            <div className="bg-[#09090B]/40 rounded-xl p-3 border-l-2 border-amber-500 mt-2">
              <span className="block text-[9px] uppercase font-bold text-amber-400 tracking-wider mb-1">
                Insider Tip:
              </span>
              <p className="text-gray-300 text-xs font-light leading-normal">{festival.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

