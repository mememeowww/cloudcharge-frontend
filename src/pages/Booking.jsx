// src/pages/Booking.jsx
import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Booking = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch available stations from backend
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

  // ✅ Open booking modal
  const handleBook = (station) => {
    setSelectedStation(station);
    setBooking({
      stationId: station._id,
      station: station.name,
      time: new Date().toISOString(),
      cost: (Math.random() * 5 + 2).toFixed(2),
    });
  };

  // ✅ Confirm booking (send to backend)
  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to book a slot.");
        return;
      }

      setLoading(true);

      const payload = {
        stationId: booking.stationId,
        startTime: booking.time,
        cost: parseFloat(booking.cost),
      };

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert(`✅ Booking Confirmed!\nStation: ${booking.station}\nCost: $${booking.cost}`);
      setBooking(null);
      setSelectedStation(null);
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.message || "Error confirming booking");
      setLoading(false);
    }
  };

  // ✅ Cancel modal
  const closeModal = () => {
    setSelectedStation(null);
    setBooking(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-violet-950 text-white flex flex-col items-center pt-24">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
        🕓 Reserve Slots
      </h1>
      <p className="text-gray-300 mb-10 text-center px-4">
        Choose a nearby CloudCharge station to book your EV charging slot.
      </p>

      {/* 🟣 Station Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {stations.length > 0 ? (
          stations.map((station) => (
            <div
              key={station._id}
              onClick={() => handleBook(station)}
              className={`p-6 rounded-xl border backdrop-blur-md cursor-pointer transition ${
                station.available
                  ? "bg-green-500/20 border-green-400/50 hover:bg-green-500/30"
                  : "bg-red-500/20 border-red-400/50 hover:bg-red-500/30"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{station.name}</h2>
              <p>Slots: {station.slots}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    station.available ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {station.available ? "Available" : "Full"}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-3 text-center">
            No stations found. Please try again later.
          </p>
        )}
      </div>

      {/* 🪟 Booking Modal */}
      {selectedStation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-white/10 border border-white/30 p-8 rounded-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold mb-4">{selectedStation.name}</h3>
            <p className="text-gray-300 mb-6">
              {selectedStation.available
                ? "Slots available! Confirm to book your spot."
                : "Station currently full. Try again later."}
            </p>
            {selectedStation.available && !loading ? (
              <>
                <p className="text-gray-300 mb-4">
                  ⏰ Time: {new Date(booking.time).toLocaleTimeString()} <br /> 💸
                  Cost: ${booking.cost}
                </p>
                <button
                  onClick={confirmBooking}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition"
                >
                  Confirm Booking
                </button>
              </>
            ) : (
              <p className="text-gray-400">Processing...</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 text-sm text-gray-300 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
