import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation } from 'lucide-react';
import { Card } from './Card';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom glowing pulse icon in Leaflet
const createGlowingIcon = (name) => {
  return new L.DivIcon({
    className: 'custom-div-icon-glowing',
    html: `
      <div class="relative flex items-center justify-center w-6 h-6">
        <span class="absolute inline-flex w-full h-full rounded-full bg-[#6EE7F9]/30 animate-ping"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-[#6EE7F9] border border-black shadow-[0_0_8px_rgba(110,231,249,0.8)]"></span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10]
  });
};

function MapController({ attractions }) {
  const map = useMap();
  
  useEffect(() => {
    if (attractions && attractions.length > 0) {
      const validAttractions = attractions.filter(a => a.lat !== 0 && a.lng !== 0);
      if (validAttractions.length > 0) {
        const bounds = validAttractions.map(a => [a.lat, a.lng]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [attractions, map]);
  
  return null;
}

export function Map({ attractions, destination }) {
  if (!attractions || attractions.length === 0) return null;

  const validAttractions = attractions.filter(a => a.lat !== 0 && a.lng !== 0);
  
  // Default center
  const center = validAttractions.length > 0 
    ? [validAttractions[0].lat, validAttractions[0].lng]
    : [0, 0];

  return (
    <Card glass className="p-6 relative overflow-hidden bg-[#111214]/65 border-white/[0.08]">
      {/* Header section with minimal visual details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#6EE7F9]/10 rounded-xl text-[#6EE7F9] border border-[#6EE7F9]/20">
            <MapIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">Interactive Map</h2>
            <p className="text-xs text-gray-400 font-light">Interactive highlights mapped in {destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-[#17181C] text-[10px] text-gray-400">
          <Navigation size={12} className="text-[#8B5CF6]" />
          OSM Dark Mode
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[450px] rounded-2xl overflow-hidden border border-white/10"
      >
        {validAttractions.length > 0 ? (
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {/* CartoDB Dark Matter tile layer matches the dark first system perfectly */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapController attractions={validAttractions} />
            {validAttractions.map((attraction, idx) => (
              <Marker 
                key={idx} 
                position={[attraction.lat, attraction.lng]}
                icon={createGlowingIcon(attraction.name)}
              >
                <Popup>
                  <div className="p-1 space-y-1">
                    <h3 className="font-semibold text-sm tracking-wide text-white">{attraction.name}</h3>
                    <p className="text-xs text-gray-400 leading-normal font-light">{attraction.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#6EE7F9]/10 text-[#6EE7F9] border border-[#6EE7F9]/20">
                        {attraction.type || 'Attraction'}
                      </span>
                      {attraction.rating && (
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <span className="text-[10px]">⭐</span>
                          <span className="text-[10px] font-bold text-gray-300">{attraction.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#17181C]">
            <div className="text-center space-y-2">
              <MapIcon className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Interactive map coordinate routing</p>
            </div>
          </div>
        )}
      </motion.div>
    </Card>
  );
}
