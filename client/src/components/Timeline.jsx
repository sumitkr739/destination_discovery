import { Calendar, Clock, MapPin, Lightbulb } from 'lucide-react';
import { Card } from './Card';

export function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#6EE7F9]/10 rounded-xl text-[#6EE7F9] border border-[#6EE7F9]/20">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Day-by-Day Itinerary</h2>
          <p className="text-xs text-gray-400 font-light">Handcrafted routing scheduled dynamically for you</p>
        </div>
      </div>

      <div className="space-y-8 relative">
        {/* Glow path background line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#6EE7F9]/30 via-[#8B5CF6]/20 to-transparent pointer-events-none" />

        {timeline.map((day, dayIdx) => (
          <div key={dayIdx} className="relative">
            {/* Day Header */}
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6EE7F9] to-[#8B5CF6] rounded-full flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(110,231,249,0.2)]">
                D{day.day}
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white">{day.title}</h3>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Day {day.day}</p>
              </div>
            </div>

            {/* Activities list */}
            <div className="ml-14 space-y-3.5">
              {day.activities && day.activities.map((activity, actIdx) => (
                <div
                  key={actIdx}
                  className="bg-[#17181C]/50 border border-white/5 hover:border-white/10 rounded-2xl p-4.5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle hover backlight */}
                  <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#6EE7F9]/3 rounded-full blur-[30px] pointer-events-none" />

                  <div className="flex flex-wrap items-center gap-3.5 mb-2.5">
                    <div className="flex items-center gap-1 text-[#6EE7F9] text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={12} />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                      <MapPin size={12} className="text-[#8B5CF6]" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-xs font-semibold tracking-wide text-white mb-2 leading-relaxed">
                    {activity.activity}
                  </h4>
                  
                  {activity.tips && (
                    <div className="bg-amber-500/5 border-l-2 border-amber-500/50 rounded-r-xl p-3 mt-3 flex items-start gap-2.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-300 leading-normal font-light">
                        {activity.tips}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

