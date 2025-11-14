import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black-violet-gradient px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Charging Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Basic</h2>
          <p className="mb-4">Pay per kWh</p>
          <p className="text-3xl font-bold mb-4">$0.35/kWh</p>
          <button className="btn">Select</button>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Standard</h2>
          <p className="mb-4">Monthly subscription</p>
          <p className="text-3xl font-bold mb-4">$25/month</p>
          <button className="btn">Select</button>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Premium</h2>
          <p className="mb-4">Unlimited charging + priority slots</p>
          <p className="text-3xl font-bold mb-4">$50/month</p>
          <button className="btn">Select</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
