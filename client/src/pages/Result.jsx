import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { tripAPI } from '../services/api';
import { Button } from '../components/Button';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { StoryCard } from '../components/StoryCard';
import { HiddenGemsCard } from '../components/HiddenGemsCard';
import { FoodPassport } from '../components/FoodPassport';
import { CulturalEtiquette } from '../components/CulturalEtiquette';
import { FestivalsCard } from '../components/FestivalsCard';
import { SouvenirsCard } from '../components/SouvenirsCard';
import { LanguageCard } from '../components/LanguageCard';
import { PackingCard } from '../components/PackingCard';
import { Timeline } from '../components/Timeline';
import { Map } from '../components/Map';
import { exportToPDF } from '../utils/pdfExport';

export default function Result() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getTrip(tripId);
      if (response.success) {
        setTrip(response.data);
      } else {
        throw new Error('Failed to fetch trip');
      }
    } catch (err) {
      console.error('Error fetching trip:', err);
      setError(err.response?.data?.error || 'Failed to load trip');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!trip) return;
    setExporting(true);
    try {
      await exportToPDF(trip);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${trip.destination} Trip`,
          text: `Check out my cultural journey to ${trip.destination}!`,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Trip not found'}
          </h2>
          <Button onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              New Trip
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {trip.destination}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                <span className="px-3 py-1 bg-white rounded-full">{trip.budget}</span>
                <span className="px-3 py-1 bg-white rounded-full">{trip.duration}</span>
                <span className="px-3 py-1 bg-white rounded-full">{trip.personality}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 size={16} />
              Share
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportPDF}
              disabled={exporting}
              className="gap-2"
            >
              <Download size={16} />
              {exporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <StoryCard story={trip.story} />
          <HiddenGemsCard gems={trip.hiddenGems} />
          <FoodPassport foodPassport={trip.foodPassport} />
          <Map attractions={trip.attractions} destination={trip.destination} />
          <Timeline timeline={trip.timeline} />
          <CulturalEtiquette etiquette={trip.culturalEtiquette} />
          <FestivalsCard festivals={trip.festivals} />
          <LanguageCard phrases={trip.phrases} />
          <SouvenirsCard souvenirs={trip.souvenirs} />
          <PackingCard packingList={trip.packingList} />
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Button onClick={() => navigate('/history')} variant="outline">
            View All My Trips
          </Button>
        </div>
      </div>
    </div>
  );
}
