import { MessageCircle, Volume2 } from 'lucide-react';
import { Card } from './Card';

export function LanguageCard({ phrases }) {
  if (!phrases || phrases.length === 0) return null;

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speaking first
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card glass className="bg-[#111214]/65 border-white/[0.08] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#6EE7F9]/10 rounded-xl text-[#6EE7F9] border border-[#6EE7F9]/20">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-white">Language Companion</h2>
          <p className="text-xs text-gray-400 font-light">Essential local phrases with audio simulation</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phrases.map((phrase, idx) => (
          <div
            key={idx}
            className="bg-[#17181C]/50 border border-white/5 rounded-2xl p-4.5 hover:border-[#6EE7F9]/20 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xl select-none">💬</span>
                <button
                  onClick={() => handleSpeak(phrase.phrase)}
                  className="p-2 bg-white/5 border border-white/5 hover:border-[#6EE7F9]/30 hover:bg-[#6EE7F9]/10 rounded-full text-gray-400 hover:text-[#6EE7F9] transition-all duration-200"
                  title="Speak phrase"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-sm font-semibold tracking-wide text-white mb-1">
                {phrase.phrase}
              </h3>
              
              <p className="text-[11px] text-[#6EE7F9] font-mono mb-3">
                [{phrase.pronunciation}]
              </p>
            </div>
            
            <p className="text-xs text-gray-400 font-light leading-normal border-t border-white/5 pt-2 italic">
              "{phrase.meaning}"
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

