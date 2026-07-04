import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Lightbulb } from 'lucide-react';
import { Card } from './Card';

export function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Day-by-Day Itinerary</h2>
      </div>

      <div className="space-y-8">
        {timeline.map((day, dayIdx) => (
          <motion.div
            key={dayIdx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dayIdx * 0.15 }}
            className="relative"
          >
            {/* Timeline connector */}
            {dayIdx < timeline.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-transparent" />
            )}

            {/* Day header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {day.day}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{day.title}</h3>
                <p className="text-sm text-gray-500">Day {day.day}</p>
              </div>
            </div>

            {/* Activities */}
            <div className="ml-16 space-y-4">
              {day.activities && day.activities.map((activity, actIdx) => (
                <motion.div
                  key={actIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIdx * 0.15 + actIdx * 0.1 }}
                  className="bg-white/70 rounded-xl p-4 border border-gray-200 hover:bg-white/90 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <Clock size={16} />
                      <span className="font-semibold text-sm">{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{activity.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2">{activity.activity}</h4>
                  
                  {activity.tips && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 mt-2">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-700">{activity.tips}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
