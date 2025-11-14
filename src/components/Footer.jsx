import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cloudblue via-twilightpurple to-energyyellow mt-16 p-6 text-center text-white">
      <p className="text-gray-100">
        &copy; {new Date().getFullYear()} CloudCharge. All rights reserved.
      </p>
    </footer>
  );
}
