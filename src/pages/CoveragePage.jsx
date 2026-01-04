import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaLocationArrow,
  FaCity,
  FaMapMarkerAlt,
} from "react-icons/fa";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import "leaflet/dist/leaflet.css";

// --- CUSTOM MARKER ICON ---
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#d96c4e" fill-opacity="0.2"/>
      <circle cx="12" cy="12" r="6" fill="#d96c4e" stroke="white" stroke-width="2"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// --- FLY TO HELPER ---
const FlyToComponent = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10, { animate: true, duration: 1.5 });
  }
  return null;
};

const CoveragePage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [flyToPosition, setFlyToPosition] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(null);

  // --- FETCH DATA FROM PUBLIC/LOCATION.JSON ---
  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load location data:", err);
        toast.error("Failed to load map data.");
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredLocations = locations.filter(
    (loc) =>
      loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationClick = (loc) => {
    if (loc.latitude && loc.longitude) {
      setFlyToPosition([loc.latitude, loc.longitude]);
      setSelectedLoc(loc);
      toast.success(`Flying to ${loc.district}`);
    } else {
      toast.error("Coordinates missing for this location");
    }
  };

  // Default Center (Bangladesh)
  const defaultCenter = [23.685, 90.3563];

  if (loading) return <UniversalSpinner />;

  return (
    <div className="bg-base-100 min-h-screen font-sans">
      <title>Coverage Map - TasteTribe</title>

      {/* --- HEADER --- */}
      <section className="pt-32 pb-12 px-4 bg-base-100">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-base-300 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Live Network
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-secondary tracking-tighter mb-6">
            Mapping the <span className="text-gradient">Flavor.</span>
          </h1>
          <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
            Explore our active districts across the country. We are currently
            present in {locations.length} districts.
          </p>
        </div>
      </section>

      {/* --- MAIN INTERFACE (Split Layout) --- */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-7xl h-[800px] lg:h-[650px] flex flex-col lg:flex-row gap-8">
          {/* LEFT PANEL: The Command Center */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/3 bg-base-200 rounded-[2.5rem] p-6 flex flex-col overflow-hidden border border-base-300 shadow-xl"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder="Search district or region..."
                className="input input-lg w-full rounded-2xl pl-12 bg-base-100 border-none focus:ring-2 focus:ring-primary transition-all text-secondary font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Stats Row */}
            <div className="flex justify-between mb-6 px-2">
              <div>
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
                  Districts
                </p>
                <p className="text-2xl font-black text-secondary">
                  {locations.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
                  Status
                </p>
                <p className="text-sm font-bold text-success flex items-center justify-end gap-1">
                  <span className="w-2 h-2 rounded-full bg-success"></span>{" "}
                  Online
                </p>
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {filteredLocations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLocationClick(loc)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between group
                           ${
                             selectedLoc?.district === loc.district
                               ? "bg-secondary text-secondary-content border-secondary"
                               : "bg-base-100 border-transparent hover:border-primary/30 hover:shadow-md"
                           }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedLoc?.district === loc.district
                          ? "bg-white/20"
                          : "bg-base-200 text-primary"
                      }`}
                    >
                      <FaCity />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{loc.district}</h4>
                      <p
                        className={`text-xs uppercase font-bold tracking-wider ${
                          selectedLoc?.district === loc.district
                            ? "opacity-70"
                            : "text-base-content/40"
                        }`}
                      >
                        {loc.region}
                      </p>
                    </div>
                  </div>
                  <FaLocationArrow
                    className={`transform transition-transform ${
                      selectedLoc?.district === loc.district
                        ? "rotate-45 text-accent"
                        : "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 text-primary"
                    }`}
                  />
                </motion.div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="text-center py-10 opacity-50">
                  <p>No districts found.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT PANEL: The Map Window */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-2/3 h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-base-200 relative z-0"
          >
            <MapContainer
              center={defaultCenter}
              zoom={7}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {locations.map(
                (loc, idx) =>
                  // Only render marker if coordinates exist
                  loc.latitude &&
                  loc.longitude && (
                    <Marker
                      key={idx}
                      position={[loc.latitude, loc.longitude]}
                      icon={customIcon}
                    >
                      <Popup className="custom-popup">
                        <div className="p-2 min-w-[150px]">
                          <h3 className="font-bold text-lg text-[#4a2c2a]">
                            {loc.district}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-xs font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                loc.status === "active"
                                  ? "bg-[#d96c4e]"
                                  : "bg-gray-400"
                              }`}
                            >
                              {loc.status}
                            </span>
                          </div>

                          {loc.covered_area && loc.covered_area.length > 0 ? (
                            <div className="mt-2">
                              <p className="text-xs font-bold text-gray-500 uppercase">
                                Hotspots:
                              </p>
                              <p className="text-sm text-gray-700 leading-tight">
                                {loc.covered_area.join(", ")}
                              </p>
                            </div>
                          ) : (
                            <p className="mt-2 text-xs italic text-gray-400">
                              Expanding soon...
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
              )}

              <FlyToComponent position={flyToPosition} />
            </MapContainer>

            {/* Overlay Badge */}
            <div className="absolute top-6 right-6 bg-base-100 backdrop-blur px-4 py-2 rounded-full shadow-lg z-1000 text-xs font-bold text-secondary flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>{" "}
              Live Data
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoveragePage;
