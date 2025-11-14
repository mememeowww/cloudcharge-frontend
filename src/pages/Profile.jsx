import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view your profile.");
          return;
        }

        // Fetch profile from backend
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black-violet-gradient flex items-center justify-center text-red-400 text-lg">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black-violet-gradient flex items-center justify-center text-gray-300 text-lg">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-violet-gradient px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Personal Info */}
        <div className="card bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            Personal Info
          </h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Membership:</strong> Premium
          </p>
        </div>

        {/* Vehicle Info */}
        <div className="card bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Vehicle Info
          </h2>
          <p>
            <strong>Vehicle:</strong> Tesla Model 3
          </p>
          <p>
            <strong>Charging History:</strong> 24 sessions
          </p>
          <p>
            <strong>Total Energy:</strong> 750 kWh
          </p>
          <p>
            <strong>Total Spent:</strong> $350
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
