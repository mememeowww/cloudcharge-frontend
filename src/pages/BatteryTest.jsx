import React, { useEffect } from "react";

const BatteryTest = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/api/battery", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Battery Data:", data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="text-white bg-black min-h-screen flex items-center justify-center">
      <h1>Check your console for battery data ⚡</h1>
    </div>
  );
};

export default BatteryTest;
