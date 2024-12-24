/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // alt klasörleri de kapsayacak şekilde güncellendi
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: "#03DAC6",
        secondary: "#3700B3",
        accent: "#CF6679",
        warning: "#FFB300",
        text: "#FFFFFF",
        "text-secondary": "#B0B0B0",
      },
    },
  },
  plugins: [],
};
