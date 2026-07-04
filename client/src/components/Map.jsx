import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Map as MapIcon } from 'lucide-react';
import { Card } from './Card';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  
  // Default center (will be adjusted by MapController)
  const center = validAttractions.length > 0 
    ? [validAttractions[0].lat, validAttractions[0].lng]
    : [0, 0];

  return (
    <Card glass className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl">
          <MapIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Interactive Map</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[500px] rounded-xl overflow-hidden border-2 border-gray-200"
      >
        {validAttractions.length > 0 ? (
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController attractions={validAttractions} />
            {validAttractions.map((attraction, idx) => (
              <Marker key={idx} position={[attraction.lat, attraction.lng]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-gray-800 mb-1">{attraction.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold">{attraction.rating}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map will be available with location data</p>
            </div>
          </div>
        )}
      </motion.div>
    </Card>
  );
}
