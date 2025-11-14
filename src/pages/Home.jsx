// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBatteryFull,
  FaMapMarkerAlt,
  FaClock,
  FaCreditCard,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [batteryLocation, setBatteryLocation] = useState({
    lat: 0,
    lon: 0,
    status: "Idle",
    level: 0,
  });
  const [lastUpdated, setLastUpdated] = useState(null);

  // ✅ Fetch stations (auto-refresh every 15s)
  const fetchStations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stations`);
      if (!res.ok) throw new Error("Server Error");
      const data = await res.json();
      setStations(data.stations || data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching stations:", err);
      setStations([
        { available: true, slots: 3 },
        { available: false, slots: 0 },
        { available: true, slots: 2 },
      ]);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 15000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch battery data every 5s (mock/live)
  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/battery/status/live`);
        if (!res.ok) throw new Error("Battery API unavailable");
        const data = await res.json();
        setBatteryLocation({
          lat: data.lat,
          lon: data.lon,
          status: data.status,
          level: data.level,
        });
      } catch {
        setBatteryLocation({
          lat: 12.9716 + Math.random() * 0.02 - 0.01,
          lon: 77.5946 + Math.random() * 0.02 - 0.01,
          status: ["Charging", "In Transit", "Idle"][Math.floor(Math.random() * 3)],
          level: (80 + Math.random() * 20).toFixed(1),
        });
      }
    };

    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Feature cards
  const features = [
    {
      icon: <FaBatteryFull size={48} className="mb-4 text-purple-400" />,
      title: "Battery Status",
      desc: "Track your EV battery health and charging state live.",
      onClick: () => navigate("/usage"),
    },
    {
      icon: <FaMapMarkerAlt size={48} className="mb-4 text-purple-400" />,
      title: "Find Stations",
      desc: "Locate nearby CloudCharge stations and check availability.",
      onClick: () => navigate("/stations"),
    },
    {
      icon: <FaClock size={48} className="mb-4 text-purple-400" />,
      title: "Reserve Slots",
      desc: "Pre-book your charging slot to avoid queues.",
      onClick: () => navigate("/booking"),
    },
    {
      icon: <FaCreditCard size={48} className="mb-4 text-purple-400" />,
      title: "Secure Payments",
      desc: "Instantly pay for your charge sessions through CloudPay.",
      onClick: () => navigate("/payment"),
    },
  ];

  // ⏱️ Format last updated time
  const formatTime = (date) => {
    if (!date) return "Loading...";
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds difference
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-24 md:pt-32 bg-gradient-to-b from-black to-violet-950 text-white">
      
      {/* 🔷 Hero Section */}
      <section className="text-center max-w-4xl mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
          CloudCharge
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Smart EV charging at your fingertips. Monitor battery status, find
          nearby stations, reserve slots, and pay seamlessly. Real-time
          intelligence meets effortless charging ⚡
        </p>
      </section>

      {/* 🟣 Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mb-20">
        {features.map((item, i) => (
          <div
            key={i}
            onClick={item.onClick}
            className="bg-white/10 p-8 rounded-2xl shadow-lg border border-white/20 text-center cursor-pointer hover:bg-white/20 transition"
          >
            {item.icon}
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-200">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ⚡ Network Summary */}
      <section className="w-full max-w-4xl mb-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
          ⚡ Charging Network Summary
        </h2>

        {stations.length > 0 ? (
          <p className="text-gray-300">
            {stations.filter((s) => s.available).length} stations available out
            of {stations.length}, with{" "}
            {stations.reduce((acc, s) => acc + s.slots, 0)} total slots across
            CloudCharge.
          </p>
        ) : (
          <p className="text-gray-400 animate-pulse">
            Fetching latest network data...
          </p>
        )}

        {/* 🕒 Last Updated */}
        <p className="text-sm text-gray-400 mt-2 italic">
          Last updated {formatTime(lastUpdated)}
        </p>

        <button
          onClick={() => navigate("/stations")}
          className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          View All Stations
        </button>
      </section>

      {/* 📍 Battery Tracking */}
      <section className="text-center mb-20">
        <h2 className="text-3xl font-bold mb-4 text-gradient">
          📍 Battery Live Tracking
        </h2>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-md mx-auto shadow-lg space-y-3">
          <p className="text-gray-200">
            Latitude: {batteryLocation.lat.toFixed(4)}
          </p>
          <p className="text-gray-200">
            Longitude: {batteryLocation.lon.toFixed(4)}
          </p>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-gray-200">Charge Level:</p>
            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-4 ${
                  batteryLocation.level > 70
                    ? "bg-green-500"
                    : batteryLocation.level > 40
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${batteryLocation.level}%` }}
              ></div>
            </div>
            <p className="text-gray-300 text-sm">
              {batteryLocation.level}%
            </p>
          </div>
          <p className="text-gray-300">
            Status:{" "}
            <span
              className={`font-semibold ${
                batteryLocation.status === "Charging"
                  ? "text-green-400"
                  : batteryLocation.status === "In Transit"
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              {batteryLocation.status}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
