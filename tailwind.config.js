/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/bg-login.svg')"
      }
    },
  },
  daisyui: {
    themes: [
      {
        shredmenta: {
          "primary": "#ad08a2",
          "base-100": "#212121"
        }
      }
    ]
  },
  plugins: [require("daisyui")],
};
