/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Monochrome system — black / grey / low-opacity cream.
        ink: {
          950: "#0A0A0A", // primary background
          900: "#121212", // secondary background
          800: "#181818", // card background
          700: "#232323", // elevated card / hover
          600: "#2E2E2E", // border-adjacent surfaces
        },
        cream: {
          DEFAULT: "#EDE8DE", // full-strength cream, used sparingly
          dim: "rgba(237,232,222,0.3)", // the ~30% cream requested for body/accents
          faint: "rgba(237,232,222,0.12)",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.45)",
        "glow-cream": "0 0 30px rgba(237,232,222,0.15)",
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: "translateY(30px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulse2: { "0%,100%": { opacity: 0.6, transform: "scale(1)" }, "50%": { opacity: 1, transform: "scale(1.05)" } },
        glowPulse: { "0%,100%": { boxShadow: "0 0 20px rgba(237,232,222,0.08)" }, "50%": { boxShadow: "0 0 34px rgba(237,232,222,0.2)" } },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease forwards",
        blink: "blink 1s infinite",
        float: "float 4s ease-in-out infinite",
        pulse2: "pulse2 2s infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
