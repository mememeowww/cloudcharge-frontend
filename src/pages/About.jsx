import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-black-violet-gradient px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About CloudCharge</h1>
      <div className="card max-w-4xl mx-auto">
        <p>
          CloudCharge is a smart EV charging platform that allows users to monitor their
          vehicle battery, find nearby charging stations, reserve slots, and make
          secure payments. Our mission is to make EV charging effortless, fast, and
          reliable.
        </p>
        <p className="mt-4">
          Using real-time data, our platform helps drivers save time and ensures they
          always find an available charging station. VoltSoft brings the future of EV
          charging to your fingertips.
        </p>
      </div>
    </div>
  );
};

export default About;
