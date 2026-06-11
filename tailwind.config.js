/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        serif: ["Georgia", "Songti SC", "STSong", "serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#1a1a1f",
          raised: "#24242b",
          overlay: "#2e2e38",
        },
        accent: {
          DEFAULT: "#c4a882",
          muted: "#8a7a62",
        },
        text: {
          primary: "#e8e4df",
          secondary: "#9a9590",
          muted: "#6b6660",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
