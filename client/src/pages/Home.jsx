import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, User, Tag, Loader2, History } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { tripAPI } from '../services/api';

const personalities = [
  { value: 'Explorer', emoji: '🗺️', description: 'Adventure seeker' },
  { value: 'Foodie', emoji: '🍜', description: 'Culinary enthusiast' },
  { value: 'Backpacker', emoji: '🎒', description: 'Budget traveler' },
  { value: 'Luxury', emoji: '✨', description: 'Premium experiences' },
  { value: 'Photographer', emoji: '📸', description: 'Visual storyteller' },
  { value: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Family-friendly' },
];

const budgetOptions = ['Budget', 'Mid-range', 'Luxury'];
const durationOptions = ['3 days', '5 days', '7 days', '10 days', '14 days'];

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: '',
    personality: '',
    interests: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.destination || !formData.budget || !formData.duration || !formData.personality) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const interests = formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(i => i);
      
      const response = await tripAPI.generate({
        ...formData,
        interests: interests.length > 0 ? interests : ['Culture', 'Food', 'Nature']
      });
      
      if (response.success && response.tripId) {
        navigate(`/result/${response.tripId}`);
      } else {
        throw new Error('Failed to generate trip');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to generate trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Hero />

        {/* History Button */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/history')}
            className="gap-2"
          >
            <History size={18} />
            View Past Trips
          </Button>
        </div>

        <Card glass className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Plan Your Cultural Journey
              </h2>
              <p className="text-gray-600">
                Tell us about your dream destination and travel preferences
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Destination */}
            <Input
              label="Destination"
              placeholder="e.g., Tokyo, Paris, Bali..."
              icon={MapPin}
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
            />

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {budgetOptions.map((budget) => (
                  <motion.button
                    key={budget}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.budget === budget
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 mx-auto mb-1" />
                    <span className="font-semibold text-sm">{budget}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Duration *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {durationOptions.map((duration) => (
                  <motion.button
                    key={duration}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, duration })}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold ${
                      formData.duration === duration
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {duration}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Personality *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {personalities.map((p) => (
                  <motion.button
                    key={p.value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, personality: p.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.personality === p.value
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{p.emoji}</div>
                    <div className="font-semibold text-sm">{p.value}</div>
                    <div className="text-xs text-gray-500">{p.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <Input
              label="Interests (Optional)"
              placeholder="e.g., History, Art, Hiking, Shopping..."
              icon={Tag}
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            />
            <p className="text-xs text-gray-500 -mt-4">
              Separate multiple interests with commas
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Crafting Your Journey...
                </>
              ) : (
                <>
                  ✨ Generate My Cultural Journey
                </>
              )}
            </Button>

            {loading && (
              <div className="text-center text-sm text-gray-600">
                <p>This may take up to 30 seconds...</p>
                <p className="text-xs mt-1">☕ Perfect time for a quick coffee break!</p>
              </div>
            )}
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Powered by AI • Designed for Authentic Experiences</p>
        </div>
      </div>
    </div>
  );
}
