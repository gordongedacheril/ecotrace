import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import type { Recycler } from '../types';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createRecyclerIcon = (isActive: boolean) =>
  L.divIcon({
    className: 'bg-transparent',
    html: `<div style="width:${isActive ? 20 : 16}px;height:${isActive ? 20 : 16}px;border-radius:50%;background:#10b981;border:2px solid #0b1326;box-shadow:0 0 10px rgba(16,185,129,0.8);transition:all 0.3s;${isActive ? 'transform:scale(1.3);' : ''}"></div>`,
    iconSize: [isActive ? 20 : 16, isActive ? 20 : 16],
    iconAnchor: [isActive ? 10 : 8, isActive ? 10 : 8],
    popupAnchor: [0, -10],
  });

const userIcon = L.divIcon({
  className: 'bg-transparent',
  html: `<div style="position:relative;width:16px;height:16px;border-radius:50%;background:#3b82f6;border:2px solid #0b1326;box-shadow:0 0 10px rgba(59,130,246,0.8);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const USER_LOCATION: [number, number] = [30.9010, 75.8573];

export default function MapPage() {
  const { userPincode, userCity } = useApp();
  const [searchLocation, setSearchLocation] = useState(`${userPincode}, ${userCity}, Punjab`);
  const [activeFilters, setActiveFilters] = useState<string[]>(['CPCB Authorized']);
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler | null>(null);
  const [pickupBooked, setPickupBooked] = useState(false);

  useEffect(() => {
    fetch('/api/recyclers')
      .then((res) => res.json())
      .then((data) => {
        setRecyclers(data);
        if (data.length > 0) setSelectedRecycler(data[0]);
      })
      .catch((err) => console.error('Failed to fetch recyclers:', err));
  }, []);

  const filters = ['CPCB Authorized', 'Battery Dropoff', 'Doorstep Pickup', '< 5 km', '< 10 km'];

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const filteredRecyclers = recyclers.filter((r) => {
    if (activeFilters.includes('Doorstep Pickup') && !r.doorstep_pickup) return false;
    if (activeFilters.includes('< 5 km') && r.distance_km > 5) return false;
    if (activeFilters.includes('< 10 km') && r.distance_km > 10) return false;
    return true;
  });

  const handleBookPickup = () => {
    setPickupBooked(true);
    setTimeout(() => setPickupBooked(false), 3000);
  };

  const getDirections = () => {
    if (selectedRecycler) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${selectedRecycler.lat},${selectedRecycler.lng}`,
        '_blank',
      );
    }
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search Header */}
      <div className="px-4 pt-2 pb-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
          </div>
          <input
            type="text"
            className="w-full bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl py-3 pl-10 pr-4 text-on-surface placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-lg text-[14px]"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search location..."
          />
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 mt-3 pb-2" style={{ scrollbarWidth: 'none' }}>
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 backdrop-blur-md ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-high'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Area */}
      <div className="relative w-full mx-4 mt-3" style={{ width: 'calc(100% - 2rem)', height: '320px', borderRadius: '12px', overflow: 'hidden' }}>
        <MapContainer
          center={USER_LOCATION}
          zoom={13}
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <Marker position={USER_LOCATION} icon={userIcon}>
            <Popup>
              <div className="text-slate-900 font-semibold text-sm">You are here</div>
            </Popup>
          </Marker>

          {filteredRecyclers.map((recycler) => (
            <Marker
              key={recycler.id}
              position={[recycler.lat, recycler.lng]}
              icon={createRecyclerIcon(selectedRecycler?.id === recycler.id)}
              eventHandlers={{
                click: () => setSelectedRecycler(recycler),
              }}
            >
              <Popup>
                <div className="text-slate-900 font-semibold text-sm">{recycler.name}</div>
                <div className="text-slate-600 text-xs">{recycler.distance_km} km away</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Facilities count badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-[400]">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
            &gt; {filteredRecyclers.length} FACILITIES NEARBY
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-[14px]">expand_more</span>
        </div>
      </div>

      {/* Selected Recycler Card */}
      {selectedRecycler && (
        <div className="mx-4 mt-4 bg-surface-container/95 backdrop-blur-xl border border-outline-variant/20 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-[18px] font-semibold text-on-surface leading-[24px]">
                {selectedRecycler.name}
              </h2>
              <p className="text-[12px] text-on-surface-variant mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">location_on</span>
                {selectedRecycler.distance_km} km away • {selectedRecycler.address}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-3">
              <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-tertiary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-[14px] font-bold text-on-surface">{selectedRecycler.rating}</span>
              </div>
              <span className="text-[10px] text-primary font-bold mt-1">
                {selectedRecycler.tons_recycled} tons recycled
              </span>
            </div>
          </div>


          {/* Facility Details */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-start gap-2 bg-surface-container-low p-2.5 rounded-lg">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] mt-0.5">schedule</span>
              <div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase">Facility Hours</div>
                <div className="text-[12px] font-semibold text-on-surface">{selectedRecycler.facility_hours}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-surface-container-low p-2.5 rounded-lg">
              <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">battery_charging_full</span>
              <div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase">Accepted Types</div>
                <div className="text-[12px] font-semibold text-on-surface truncate">{selectedRecycler.accepted_types.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-3">
            <button
              onClick={getDirections}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-high hover:bg-surface-bright text-on-surface font-semibold rounded-xl transition-colors border border-outline-variant/20 text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              Get Directions
            </button>
            <button
              onClick={handleBookPickup}
              disabled={pickupBooked}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-all duration-300 text-[14px] ${
                pickupBooked
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-primary hover:bg-primary-container text-on-primary shadow-[0_4px_16px_rgba(16,185,129,0.25)]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {pickupBooked ? 'check_circle' : 'local_shipping'}
              </span>
              {pickupBooked ? 'Confirmed!' : 'Book Pickup'}
            </button>
          </div>

          {/* Status pills */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] text-on-surface-variant flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              {selectedRecycler.processing_capacity}
            </span>
            <span className="text-[10px] text-on-surface-variant flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              {selectedRecycler.wait_time}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
