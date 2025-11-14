// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Battery, User, Zap, Activity, Database, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch dashboard data on mount
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setDashboard(data);
        } else {
          setError("Failed to load dashboard data. Please log in again.");
          navigate("/login");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Could not connect to server.");
      }
    };

    fetchDashboard();
  }, [navigate]);

  // 🧩 Handle Loading / Error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-900 to-black text-red-400 text-lg">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-900 to-black">
        <p className="text-white text-lg animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  const { user, battery, stats } = dashboard;

  // 🔹 Show Stats Handler
  const handleShowStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      alert(
        `📊 Energy Stats:\n\nTotal Energy: ${data.totalEnergy} kWh\nTotal Cost: $${data.totalCost}\nAverage Cost per kWh: $${data.avgCostPerKWh.toFixed(
          2
        )}`
      );
    } catch (err) {
      console.error(err);
      alert("Error fetching stats");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
          >
            Welcome, {user.name.split(" ")[0]} ⚡
          </motion.h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-violet-500 to-blue-500 p-4 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-300 text-sm">{user.email}</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Joined: {new Date(user.joined).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Battery className="w-6 h-6 text-green-400" />,
              label: "Battery Status",
              value: `${battery.status}`,
              sub: `Capacity: ${battery.capacity}%`,
              color: "from-green-500/30 to-emerald-600/30",
            },
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              label: "Energy Used",
              value: `${stats.totalEnergy} kWh`,
              sub: `Across ${stats.totalSessions} sessions`,
              color: "from-yellow-500/30 to-orange-600/30",
            },
            {
              icon: <Database className="w-6 h-6 text-blue-400" />,
              label: "Total Spent",
              value: `$${stats.totalSpent}`,
              sub: "Last 30 days summary",
              color: "from-blue-500/30 to-indigo-600/30",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl border border-white/20 shadow-lg transition`}
            >
              <div className="flex items-center justify-between mb-4">{card.icon}</div>
              <h3 className="text-3xl font-bold mb-1">{card.value}</h3>
              <p className="text-gray-300 text-sm">{card.label}</p>
              <p className="text-gray-400 text-xs mt-2">{card.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Battery Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Battery className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold">Battery Overview</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-gray-400 border-b border-gray-600">
                <tr>
                  <th className="py-2">Name</th>
                  <th>Status</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">{battery.name}</td>
                  <td>{battery.status}</td>
                  <td>{battery.capacity}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 📊 Stats Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleShowStats}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              <BarChart2 className="w-5 h-5" />
              Show Energy Stats
            </button>
          </div>
        </motion.div>

        {/* Future Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-pink-400" />
            <h3 className="text-xl font-semibold">Live Analytics (Coming Soon)</h3>
          </div>
          <p className="text-gray-300">
            ⚙️ Smart charge tracking, energy predictions, and usage insights will appear here soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
