import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Eye, Calendar } from 'lucide-react';
import { tripAPI } from '../services/api';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

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
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              My Travel History
            </h1>
            <p className="text-gray-600">
              {trips.length} {trips.length === 1 ? 'journey' : 'journeys'} saved
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft size={18} />
            Back Home
          </Button>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {trips.length === 0 ? (
          <Card glass className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Trips Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start planning your first cultural journey!
            </p>
            <Button onClick={() => navigate('/')}>
              Create Your First Trip
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  glass
                  className="cursor-pointer group relative overflow-hidden"
                  onClick={() => navigate(`/result/${trip.id}`)}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    {/* Destination */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {trip.destination}
                    </h3>

                    {/* Story preview */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {trip.story}
                    </p>

                    {/* Trip details */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                        {trip.budget}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                        {trip.duration}
                      </span>
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-semibold">
                        {trip.personality}
                      </span>
                    </div>

                    {/* Interests */}
                    {trip.interests && trip.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {trip.interests.slice(0, 3).map((interest, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                        {trip.interests.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{trip.interests.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Date and actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                        <span>{formatDate(trip.createdAt)}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/result/${trip.id}`);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="View trip"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(trip.id, e)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete trip"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
