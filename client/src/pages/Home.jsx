import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, History, Search, Compass, Sparkles, Sliders, Hash, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Globe } from '../components/Globe';
import { tripAPI, authAPI } from '../services/api';

const personalities = [
  { value: 'Explorer', emoji: '🗺️', description: 'Off-grid adventure & hidden trails' },
  { value: 'Foodie', emoji: '🍜', description: 'Gastronomy, street stalls & secrets' },
  { value: 'Backpacker', emoji: '🎒', description: 'Affordable, community-led routes' },
  { value: 'Luxury', emoji: '✨', description: 'Exquisite, slow-paced premium stays' },
  { value: 'Photographer', emoji: '📸', description: 'Scenic vistas, lights & framing' },
  { value: 'Historian', emoji: '🏛️', description: 'Ancient ruins, folklore & heritage' },
];

const budgetOptions = ['Budget', 'Mid-range', 'Luxury'];
const durationOptions = ['3 days', '5 days', '7 days', '10 days', '14 days'];

// Pre-populated premium destinations with subtext
const curatedDestinations = [
  { name: 'Tokyo, Japan', desc: 'Vibrant neon streets, ancient shrines & world-class culinary art', keywords: ['tokyo', 'japan', 'asia'] },
  { name: 'Kyoto, Japan', desc: 'Zen rock gardens, bamboo groves & traditional geisha heritage', keywords: ['kyoto', 'japan', 'asia'] },
  { name: 'Paris, France', desc: 'Sidewalk café culture, historic art arches & romantic river walks', keywords: ['paris', 'france', 'europe'] },
  { name: 'Rome, Italy', desc: 'Ancient colosseum, baroque piazzas & rich gastronomic traditions', keywords: ['rome', 'italy', 'europe'] },
  { name: 'Oaxaca, Mexico', desc: 'Dia de los Muertos, indigenous textile art & culinary mole secrets', keywords: ['oaxaca', 'mexico', 'latin america'] },
  { name: 'Cusco, Peru', desc: 'Highland Inca trail, stone fortresses & traditional Andean weaving', keywords: ['cusco', 'peru', 'south america'] },
  { name: 'Jaipur, India', desc: 'Royal pink palaces, historic astronomy parks & block-print crafts', keywords: ['jaipur', 'india', 'asia'] },
  { name: 'Bali, Indonesia', desc: 'Rice terrace valleys, Hindu temple dances & coastal wellness', keywords: ['bali', 'indonesia', 'asia'] },
  { name: 'Reykjavik, Iceland', desc: 'Glacial waterfalls, hot geothermal springs & Northern Lights', keywords: ['reykjavik', 'iceland', 'europe'] },
  { name: 'Cape Town, South Africa', desc: 'Table mountain viewpoints, wildlife reserves & colorful harbors', keywords: ['cape town', 'south africa', 'africa'] },
  { name: 'Cairo, Egypt', desc: 'Giza pyramid complexes, ancient bazaars & historic mosque towers', keywords: ['cairo', 'egypt', 'middle east'] },
];

const popularInterests = ['History', 'Street Food', 'Art Galleries', 'Hiking', 'Architecture', 'Shopping', 'Festivals', 'Nature'];

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    destination: '',
    budgetIndex: 1, // Default: Mid-range
    duration: '5 days',
    personality: 'Explorer',
    interests: [],
  });

  const [searchFocused, setSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteRef = useRef(null);

  // Live suggestions filtering
  useEffect(() => {
    if (!formData.destination.trim()) {
      setSuggestions([]);
      return;
    }
    const query = formData.destination.toLowerCase();
    const filtered = curatedDestinations.filter(d => 
      d.name.toLowerCase().includes(query) || 
      d.keywords.some(k => k.includes(query))
    );
    setSuggestions(filtered);
  }, [formData.destination]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInterestToggle = (interest) => {
    const isSelected = formData.interests.includes(interest);
    if (isSelected) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.destination) {
      setError('Please provide a destination');
      return;
    }

    setLoading(true);
    
    try {
      const budget = budgetOptions[formData.budgetIndex];
      const interests = formData.interests.length > 0 
        ? formData.interests 
        : ['Culture', 'Local Secrets', 'Heritage'];
      
      const response = await tripAPI.generate({
        destination: formData.destination,
        budget,
        duration: formData.duration,
        personality: formData.personality,
        interests
      });
      
      if (response.success && response.tripId) {
        navigate(`/result/${response.tripId}`);
      } else {
        throw new Error('Failed to generate trip');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to craft your journey. Please check server logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090B] text-white overflow-hidden pb-16">
      
      {/* Cinematic Blurred Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none animate-pulse-slower" />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#6EE7F9] to-[#8B5CF6] flex items-center justify-center shadow-lg">
            <Compass size={22} className="text-black" />
          </div>
          <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            CULTURELENS
          </span>
        </div>
        <div className="flex items-center gap-3">
          {(() => {
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            
            if (user) {
              return (
                <>
                  <span className="text-sm text-gray-400">{user.name || user.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.reload();
                    }}
                    className="border-white/5 hover:border-white/10"
                  >
                    Logout
                  </Button>
                </>
              );
            } else {
              return (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="border-white/5 hover:border-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/register')}
                    className="border-white/5 hover:border-white/10"
                  >
                    Sign Up
                  </Button>
                </>
              );
            }
          })()}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/history')}
            className="gap-2 border-white/5 hover:border-white/10"
          >
            <History size={16} />
            Past Trips
          </Button>
        </div>
      </nav>

      {/* Hero & Globe Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center pt-4 mb-8">
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <Hero />
          {/* Animated Globe Container */}
          <div className="w-full max-w-[450px] mx-auto lg:mx-0">
            <Globe />
          </div>
        </div>

        {/* Floating Bento Search Card */}
        <div className="lg:col-span-5 w-full">
          <Card glass className="relative shadow-2xl p-8 border-white/10 bg-[#111214]/85">
            <div className="absolute top-0 right-10 transform -translate-y-1/2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17181C] border border-white/10 text-xs text-gray-300 shadow-md">
                <Sliders size={12} className="text-[#6EE7F9]" />
                Trip Configurator
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Destination Search */}
              <div className="relative" ref={autocompleteRef}>
                <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide flex items-center gap-2">
                  <MapPin size={16} className="text-[#6EE7F9]" />
                  Where do you want to explore?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kyoto, Paris, Oaxaca..."
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    onFocus={() => setSearchFocused(true)}
                    className="w-full rounded-full border border-white/10 bg-[#09090B]/60 backdrop-blur-md px-5 py-3.5 pl-12 text-white placeholder-gray-500 transition-all duration-300 focus:border-[#6EE7F9]/50 focus:outline-none focus:ring-4 focus:ring-[#6EE7F9]/10"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>

                {/* Live AI Autocomplete Suggestions */}
                <AnimatePresence>
                  {searchFocused && (formData.destination || suggestions.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-2 max-h-[250px] overflow-y-auto rounded-2xl border border-white/10 bg-[#17181C] p-2 shadow-2xl z-50 backdrop-blur-xl"
                    >
                      {suggestions.length > 0 ? (
                        suggestions.map((dest, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, destination: dest.name });
                              setSearchFocused(false);
                            }}
                            className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors duration-150 flex items-start gap-3 group"
                          >
                            <div className="mt-1 p-1.5 bg-[#6EE7F9]/10 rounded-lg text-[#6EE7F9] group-hover:bg-[#6EE7F9]/20 transition-colors">
                              <Compass size={16} />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm tracking-wide">{dest.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5 font-light leading-normal">{dest.desc}</div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500 font-light">
                          ✨ Type destination name... (e.g. Kyoto, Oaxaca)
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Travel Duration Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2.5 tracking-wide flex items-center gap-2">
                  <Clock size={16} className="text-[#8B5CF6]" />
                  Duration
                </label>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((duration) => {
                    const isSelected = formData.duration === duration;
                    return (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => setFormData({ ...formData, duration })}
                        className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                            : 'border-white/5 bg-[#17181C]/40 text-gray-400 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        {duration}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Budget Slider */}
              <div className="bg-[#17181C]/40 border border-white/5 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-300 tracking-wide flex items-center gap-2">
                    <Sliders size={16} className="text-amber-500" />
                    Trip Budget
                  </label>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {budgetOptions[formData.budgetIndex]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={formData.budgetIndex}
                  onChange={(e) => setFormData({ ...formData, budgetIndex: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F59E0B]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-2.5">
                  <span>Economic</span>
                  <span>Balanced</span>
                  <span>Premium</span>
                </div>
              </div>

              {/* Personality Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2.5 tracking-wide flex items-center gap-2">
                  <Compass size={16} className="text-cyan-400" />
                  Travel Personality
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {personalities.map((p) => {
                    const isSelected = formData.personality === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, personality: p.value })}
                        className={`text-left p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[85px] ${
                          isSelected
                            ? 'bg-[#6EE7F9]/10 border-[#6EE7F9]/50 text-white shadow-[0_0_15px_rgba(110,231,249,0.15)]'
                            : 'border-white/5 bg-[#17181C]/40 text-gray-400 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-lg">{p.emoji}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#6EE7F9]' : 'bg-transparent'}`} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white tracking-wide">{p.value}</div>
                          <div className="text-[9px] text-gray-500 truncate mt-0.5">{p.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interest Chips */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2.5 tracking-wide flex items-center gap-2">
                  <Hash size={16} className="text-[#8B5CF6]" />
                  Curated Interests
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {popularInterests.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]/50 text-white'
                            : 'border-white/5 bg-[#17181C]/25 text-gray-400 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    Crafting cultural lenses...
                  </>
                ) : (
                  <>
                    <span>Generate Cultural Journey</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {loading && (
                <div className="text-center space-y-1">
                  <p className="text-[11px] text-gray-500">Connecting to Gemini AI Engine...</p>
                  <p className="text-[9px] text-[#6EE7F9]/70 font-light italic">Synthesizing local histories, dishes and maps.</p>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>

      {/* Trust Badging / Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 mt-16 text-center space-y-2">
        <p className="text-xs text-gray-600 tracking-wider">
          CULTURELENS AI &bull; DEEPMIND POWERED TRAVEL DESIGN SYSTEM
        </p>
        <p className="text-[10px] text-gray-700 font-light">
          Built using CartoDB Dark Matter, Leaflet Map and Framer Motion. Inspired by Apple & Vercel.
        </p>
      </footer>
    </div>
  );
}
