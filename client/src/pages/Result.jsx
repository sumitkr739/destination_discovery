import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, Compass, MapPin, Sparkles, Navigation } from 'lucide-react';
import { tripAPI } from '../services/api';
import { Button } from '../components/Button';
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
          title: `CultureLens: ${trip.destination}`,
          text: `Check out my cultural journey to ${trip.destination}!`,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
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
          CRAFTING CULTURELENS RESULTS...
        </p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-xl font-bold text-white">
            {error || 'Trip record not discovered'}
          </h2>
          <Button onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#09090B] text-white py-12 px-6 overflow-hidden">
      
      {/* Background radial overlays */}
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Action bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2 border-white/5 hover:border-white/10"
            >
              <ArrowLeft size={16} />
              Craft New
            </Button>
            
            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6EE7F9] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                <Compass size={16} className="text-black" />
              </div>
              <span className="font-semibold text-xs tracking-wider text-gray-300">
                CULTURELENS REPORT
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2 border-white/10 hover:bg-white/5 text-gray-300"
            >
              <Share2 size={14} />
              Share Report
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportPDF}
              disabled={exporting}
              className="gap-2 text-black bg-[#6EE7F9] hover:bg-[#6EE7F9]/90"
            >
              <Download size={14} />
              {exporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </motion.div>

        {/* Hero Banner Header block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-12 rounded-[28px] border border-white/[0.08] bg-[#111214]/65 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
        >
          {/* Subtle liquid backlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6EE7F9]/5 via-[#8B5CF6]/5 to-transparent pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17181C] border border-white/10 text-[10px] text-gray-400">
              <MapPin size={12} className="text-[#6EE7F9]" />
              Destination Profile
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {trip.destination}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8 relative z-10">
            <span className="px-3.5 py-1.5 bg-[#6EE7F9]/5 border border-[#6EE7F9]/20 text-[#6EE7F9] text-xs font-semibold rounded-full shadow-sm">
              💵 {trip.budget}
            </span>
            <span className="px-3.5 py-1.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-semibold rounded-full shadow-sm">
              ⏱️ {trip.duration}
            </span>
            <span className="px-3.5 py-1.5 bg-amber-500/5 border border-amber-500/20 text-amber-500 text-xs font-semibold rounded-full shadow-sm">
              🧭 {trip.personality}
            </span>
            {trip.interests && trip.interests.map((interest, i) => (
              <span key={i} className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">
                #{interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Story Narrative - Spans 2 Columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <StoryCard story={trip.story} />
          </div>

          {/* Interactive OSM Map - Spans 1 Column */}
          <div className="lg:col-span-1">
            <Map attractions={trip.attractions} destination={trip.destination} />
          </div>

          {/* Hidden Gems List - Spans 2 Columns */}
          <div className="lg:col-span-2">
            <HiddenGemsCard gems={trip.hiddenGems} />
          </div>

          {/* Cultural Etiquette Rules - Spans 1 Column */}
          <div className="lg:col-span-1">
            <CulturalEtiquette etiquette={trip.culturalEtiquette} />
          </div>

          {/* Food Passport Culinary sections - Spans 2 Columns */}
          <div className="lg:col-span-2">
            <FoodPassport foodPassport={trip.foodPassport} />
          </div>

          {/* Language Companion phrase widget - Spans 1 Column */}
          <div className="lg:col-span-1">
            <LanguageCard phrases={trip.phrases} />
          </div>

          {/* Travel Itinerary Schedule - Spans 2 Columns */}
          <div className="lg:col-span-2">
            <Timeline timeline={trip.timeline} />
          </div>

          {/* Right Column Stack for Side Elements */}
          <div className="lg:col-span-1 space-y-6">
            <FestivalsCard festivals={trip.festivals} />
            <SouvenirsCard souvenirs={trip.souvenirs} />
            <PackingCard packingList={trip.packingList} />
          </div>

        </div>

        {/* Floating bottom Footer */}
        <div className="text-center pt-8 border-t border-white/5">
          <Button onClick={() => navigate('/history')} variant="secondary" className="mx-auto border-white/5 hover:border-white/10">
            View All Saved Journeys
          </Button>
        </div>

      </div>
    </div>
  );
}
