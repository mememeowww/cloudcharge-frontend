/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudblue: "#7FDBFF",       // light blue
        twilightpurple: "#8A2BE2",  // purple
        energyyellow: "#FFD700",    // yellow
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};



