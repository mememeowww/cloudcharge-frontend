import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Usage = () => {
  const [battery, setBattery] = useState({
    lat: 0,
    lon: 0,
    status: "Idle",
    level: 0,
  });

  useEffect(() => {
    const fetchBattery = async () => {
      try {
        const res = await fetch(`${API_URL}/api/battery/status/live`);
        const data = await res.json();
        setBattery(data);
      } catch {
        console.error("Battery API not reachable");
      }
    };
    fetchBattery();
    const interval = setInterval(fetchBattery, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-violet-950 text-white flex flex-col items-center pt-24">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
        ⚡ Battery Status
      </h1>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-md shadow-lg space-y-3 text-center">
        <p>Latitude: {battery.lat.toFixed(4)}</p>
        <p>Longitude: {battery.lon.toFixed(4)}</p>
        <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div
            className={`h-4 ${
              battery.level > 70
                ? "bg-green-500"
                : battery.level > 40
                ? "bg-yellow-400"
                : "bg-red-500"
            }`}
            style={{ width: `${battery.level}%` }}
          ></div>
        </div>
        <p>{battery.level}%</p>
        <p>
          Status:{" "}
          <span
            className={`font-semibold ${
              battery.status === "Charging"
                ? "text-green-400"
                : battery.status === "In Transit"
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            {battery.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Usage;
