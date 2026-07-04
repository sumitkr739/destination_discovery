import { BookOpen, Sparkles } from 'lucide-react';
import { Card } from './Card';

export function StoryCard({ story }) {
  if (!story) return null;
  const paragraphs = story.split('\n\n');

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] relative overflow-hidden p-6 md:p-8">
      {/* Decorative background light */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#6EE7F9]/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#6EE7F9]/10 rounded-xl text-[#6EE7F9] border border-[#6EE7F9]/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">Destination Narrative</h2>
            <p className="text-xs text-gray-400 font-light">The cultural essence and local spirit of the journey</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#6EE7F9]/15 bg-[#6EE7F9]/5 text-[10px] text-[#6EE7F9]">
          <Sparkles size={11} className="animate-pulse" />
          Editorial
        </div>
      </div>

      <div className="prose prose-invert max-w-none md:columns-2 gap-8 leading-relaxed font-light text-gray-300 text-sm space-y-4 md:space-y-0">
        {paragraphs.map((paragraph, idx) => {
          if (idx === 0) {
            // First paragraph gets a premium dropcap
            const firstChar = paragraph.charAt(0);
            const restOfParagraph = paragraph.slice(1);
            return (
              <p key={idx} className="mb-4 text-justify">
                <span className="float-left text-4xl md:text-5xl font-bold text-[#6EE7F9] mr-2 mt-1 leading-none font-serif">
                  {firstChar}
                </span>
                {restOfParagraph}
              </p>
            );
          }
          return (
            <p key={idx} className="mb-4 text-justify">
              {paragraph}
            </p>
          );
        })}
      </div>
    </Card>
  );
}
