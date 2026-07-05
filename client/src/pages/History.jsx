import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Eye, Calendar, Compass, History as HistoryIcon } from 'lucide-react';
import { tripAPI } from '../services/api';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function History() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      if (response.success) {
        setTrips(response.data);
      } else {
        throw new Error('Failed to fetch trips');
      }
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError(err.response?.data?.error || 'Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this trip?')) {
      return;
    }

    try {
      await tripAPI.deleteTrip(tripId);
      setTrips(trips.filter(t => t.id !== tripId));
    } catch (err) {
      console.error('Error deleting trip:', err);
      alert('Failed to delete trip');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-4 border-[#6EE7F9] border-t-transparent rounded-full"
        />
        <p className="text-gray-400 text-sm tracking-wider font-light animate-pulse">
          DISCOVERING HISTORICAL RECORDS...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#09090B] text-white py-12 px-6 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[50%] h-[40%] bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Action bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between border-b border-white/5 pb-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#6EE7F9] to-[#8B5CF6] flex items-center justify-center shadow-lg">
              <HistoryIcon size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">Travel History</h1>
              <p className="text-xs text-gray-400 font-light">
                You have {trips.length} saved {trips.length === 1 ? 'journey' : 'journeys'}
              </p>
            </div>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2 border-white/5 hover:border-white/10 px-2.5 sm:px-4"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back Home</span>
          </Button>
        </motion.div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-xs">
            {error}
          </div>
        )}

        {trips.length === 0 ? (
          <Card glass className="text-center py-16 bg-[#111214]/65 border-white/[0.08]">
            <div className="text-6xl mb-4 select-none">🗺️</div>
            <h2 className="text-lg font-bold text-white mb-2">
              No Journeys Documented
            </h2>
            <p className="text-gray-400 text-xs font-light max-w-sm mx-auto mb-6 leading-relaxed">
              Start configuring your custom travelers profile and destination secrets to generate your first path.
            </p>
            <Button onClick={() => navigate('/')} className="mx-auto">
              Configure Journey
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  glass
                  hover
                  className="cursor-pointer bg-[#111214]/65 border-white/[0.08] hover:border-[#6EE7F9]/20 p-5 flex flex-col justify-between h-[280px]"
                  onClick={() => navigate(`/result/${trip.id}`)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-white tracking-wide truncate group-hover:text-[#6EE7F9] transition-colors">
                        {trip.destination}
                      </h3>
                      <span className="text-xl">✈️</span>
                    </div>

                    <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-3">
                      {trip.story}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 bg-[#6EE7F9]/5 border border-[#6EE7F9]/20 text-[#6EE7F9] text-[9px] font-bold rounded-full">
                        {trip.budget}
                      </span>
                      <span className="px-2 py-0.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 text-[#8B5CF6] text-[9px] font-bold rounded-full">
                        {trip.duration}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-500/5 border border-amber-500/20 text-amber-500 text-[9px] font-bold rounded-full">
                        {trip.personality}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px] text-gray-500 font-light">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#8B5CF6]" />
                      <span>{formatDate(trip.createdAt)}</span>
                    </div>
                    
                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/result/${trip.id}`);
                        }}
                        className="p-1.5 bg-white/5 border border-white/5 hover:border-[#6EE7F9]/30 hover:bg-[#6EE7F9]/10 rounded-lg text-gray-400 hover:text-[#6EE7F9] transition-colors"
                        title="View journey"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(trip.id, e)}
                        className="p-1.5 bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete journey"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

