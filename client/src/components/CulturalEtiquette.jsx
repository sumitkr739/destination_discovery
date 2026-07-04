import { Heart, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './Card';

export function CulturalEtiquette({ etiquette }) {
  if (!etiquette || etiquette.length === 0) return null;

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/20">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Cultural Etiquette</h2>
          <p className="text-xs text-gray-400 font-light">Crucial rules of respect and integration for travelers</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {etiquette.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#17181C]/40 border border-white/5 rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 border-b border-white/5 pb-2">
              {item.category}
            </h3>
            
            <div className="space-y-4">
              {item.dos && item.dos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    <span>Do's</span>
                  </div>
                  <ul className="space-y-2.5 pl-6 list-disc list-outside text-gray-400 text-xs font-light leading-normal">
                    {item.dos.map((doItem, i) => (
                      <li key={i} className="marker:text-emerald-400">
                        {doItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.donts && item.donts.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    <span>Don'ts</span>
                  </div>
                  <ul className="space-y-2.5 pl-6 list-disc list-outside text-gray-400 text-xs font-light leading-normal">
                    {item.donts.map((dontItem, i) => (
                      <li key={i} className="marker:text-rose-400">
                        {dontItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

