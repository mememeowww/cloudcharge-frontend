// src/pages/Register.jsx
// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for redirecting

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      const token = response.data.token; // assuming backend returns { token: "..." }
      localStorage.setItem("token", token); // save token
      setMessage("Registration successful! Redirecting to dashboard...");
      navigate("/dashboard"); // redirect after registration
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-violet-gradient px-4">
      <div className="card max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6">Register for CloudCharge</h2>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn mt-4">Register</button>
        </form>
        {message && <p className="mt-2 text-center text-white">{message}</p>}
        <p className="mt-4 text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-pink-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
