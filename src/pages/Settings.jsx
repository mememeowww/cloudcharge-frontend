import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-black-violet-gradient px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Account Settings</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="p-3 rounded bg-white/10 text-white placeholder-gray-300"
            />
            <button type="submit" className="btn mt-4">Update Password</button>
          </form>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <form className="flex flex-col gap-4">
            <label className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="accent-purple-500 w-6 h-6" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>SMS Alerts</span>
              <input type="checkbox" className="accent-purple-500 w-6 h-6" />
            </label>
            <label className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" className="accent-purple-500 w-6 h-6" defaultChecked />
            </label>
          </form>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Subscription Plan</h2>
          <p>Current Plan: <strong>Premium</strong></p>
          <button className="btn mt-4">Upgrade / Change Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
