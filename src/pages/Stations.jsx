// src/pages/Stations.jsx
import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Stations = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stations`);
        const data = await res.json();
        setStations(data.stations || data);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };
    fetchStations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-violet-950 text-white flex flex-col items-center pt-24">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
        📍 Find Stations
      </h1>
      <p className="text-gray-300 mb-10 text-center px-4">
        View all CloudCharge stations and check real-time availability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {stations.length > 0 ? (
          stations.map((station) => (
            <div
              key={station._id}
              className={`p-6 rounded-xl border backdrop-blur-md transition ${
                station.available
                  ? "bg-green-500/20 border-green-400/50"
                  : "bg-red-500/20 border-red-400/50"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{station.name}</h2>
              <p className="text-gray-300">Slots: {station.slots}</p>
              <p className="text-gray-300">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    station.available ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {station.available ? "Available" : "Full"}
                </span>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Latitude: {station.lat.toFixed(4)} | Longitude:{" "}
                {station.lon.toFixed(4)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-3 text-center">
            No stations found. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stations;
