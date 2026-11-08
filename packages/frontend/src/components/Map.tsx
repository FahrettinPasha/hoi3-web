import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  selectedNation: string | null;
  onNationSelect: (nationId: string) => void;
}

const COUNTRY_NAME_TO_ID: Record<string, string> = {
  'Germany': 'germany',
  'France': 'france',
  'United Kingdom': 'uk',
  'Italy': 'italy',
  'USSR': 'ussr',
  'Spain': 'spain',
  'Poland': 'poland',
  'Hungary': 'hungary',
  'Romania': 'romania',
  'Yugoslavia': 'yugoslavia',
  'Bulgaria': 'bulgaria',
  'Greece': 'greece',
  'Sweden': 'sweden',
  'Norway': 'norway',
  'Finland': 'finland',
  'Denmark': 'denmark',
  'Netherlands': 'netherlands',
  'Belgium': 'belgium',
  'Switzerland': 'switzerland',
  'Portugal': 'portugal',
  'Luxembourg': 'luxembourg',
  'Ireland': 'ireland',
  'Czechoslovakia': 'germany',
  'Austria': 'germany',
  'Estonia': 'estonia',
  'Latvia': 'latvia',
  'Lithuania': 'lithuania',
  'Belarus': 'ussr',
  'Ukraine': 'ussr',
  'Georgia': 'ussr',
  'Armenia': 'ussr',
  'Azerbaijan': 'ussr',
  'Kazakhstan': 'ussr',
  'Uzbekistan': 'ussr',
  'Turkmenistan': 'ussr',
  'Tajikistan': 'ussr',
  'Kyrgyzstan': 'ussr',
  'Iran': 'iran',
  'Persia': 'iran',
  'Iraq': 'iraq',
  'Egypt': 'egypt',
  'Morocco (France)': 'france',
  'Algeria': 'france',
  'Algeria (France)': 'france',
  'Tunisia': 'france',
  'Libya': 'italy',
  'Palestine': 'uk',
  'Transjordan': 'uk',
  'Syria (France)': 'france',
  'Lebanon (France)': 'france',
  'French Equatorial Africa': 'france',
  'French West Africa': 'france',
  'French Somaliland': 'france',
  'Madagascar': 'france',
  'Indochina': 'france',
  'British India': 'uk',
  'Canada': 'uk',
  'Australia': 'uk',
  'New Zealand': 'uk',
  'South Africa': 'uk',
  'Nigeria': 'uk',
  'Gold Coast': 'uk',
  'Kenya': 'uk',
  'Sudan': 'uk',
  'Rhodesia': 'uk',
  'British Somaliland': 'uk',
  'Aden': 'uk',
  'Malaya': 'uk',
  'British Borneo': 'uk',
  'British Guiana': 'uk',
  'British Honduras': 'uk',
  'Jamaica': 'uk',
  'Trinidad': 'uk',
  'Italian East Africa': 'italy',
  'Italian Somaliland': 'italy',
  'Eritrea': 'italy',
  'Ethiopia': 'italy',
  'Albania (Italy)': 'italy',
};

const Map: React.FC<MapProps> = ({ selectedNation, onNationSelect }) => {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/map/world_1938.geojson')
      .then(res => res.json())
      .then(data => {
        setGeojsonData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load map:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading map...</div>;
  }

  const nationColors: Record<string, string> = {
    germany: '#646464',
    uk: '#1e4b8a',
    france: '#284b8a',
    italy: '#3c6e3c',
    ussr: '#b91c1c',
    spain: '#c8a32c',
    poland: '#af9166',
    hungary: '#4a6741',
    romania: '#8b6914',
    yugoslavia: '#5c5c5c',
    bulgaria: '#27ae60',
    greece: '#1e8449',
    sweden: '#2e86c1',
    norway: '#5dade2',
    finland: '#7fb3d5',
    denmark: '#d4ac0d',
    netherlands: '#f39c12',
    belgium: '#e74c3c',
    switzerland: '#2ecc71',
    portugal: '#9b59b6',
    luxembourg: '#e67e22',
    ireland: '#3498db',
    estonia: '#5dade2',
    latvia: '#48c9b0',
    lithuania: '#45b39d',
    iran: '#922b21',
    iraq: '#b9770e',
    egypt: '#d4ac0d',
    neutral: '#4b5563',
  };

  const onEachFeature = (feature: any, layer: any) => {
    const countryName = feature.properties?.NAME || feature.properties?.name || 'Unknown';
    const nationId = COUNTRY_NAME_TO_ID[countryName] || 'neutral';
    const color = nationColors[nationId] || nationColors.neutral;
    
    layer.setStyle({
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    });

    layer.on({
      click: () => {
        onNationSelect(nationId);
      },
      mouseover: () => {
        layer.setStyle({ fillOpacity: 0.9, weight: 3 });
      },
      mouseout: () => {
        layer.setStyle({ fillOpacity: 0.7, weight: 2 });
      },
    });
  };

  return (
    <MapContainer
      center={[50, 10]}
      zoom={4}
      style={{ height: 'calc(100vh - 200px)', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default Map;
