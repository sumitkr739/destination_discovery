import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Card } from './Card';

export function StoryCard({ story }) {
  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Your Destination Story</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        {story.split('\n\n').map((paragraph, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-gray-700 leading-relaxed mb-4"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </Card>
  );
}
