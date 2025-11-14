// src/App.jsx
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import Usage from "./pages/Usage";
import Stations from "./pages/Stations";  // ⬅ new
import Booking from "./pages/Booking";    // ⬅ new
import Payment from "./pages/Payment";    // ⬅ new

// ✅ Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 🔹 Public routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/usage" element={<Usage />} />

        {/* 🔹 New public pages */}
        <Route path="/stations" element={<Stations />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Fallback */}
        <Route
          path="*"
          element={<h2 className="text-center mt-10 text-white">Page Not Found</h2>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
