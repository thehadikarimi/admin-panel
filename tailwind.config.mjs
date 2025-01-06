/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      dark: {
        500: "#14151b",
        700: "#090B10",
      },
      success: "#2e7b32",
      error: "#d32f2f",
      primary: "#8BCC10",
      neutral: {
        100: "#f1f2f4",
        200: "#f6f7f8",
        500: "#e4e7eb",
        700: "#9e9fb1",
      },
      overlay: "#00000066",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: ".75rem",
      },
    },
    extend: {
      fontFamily: {
        vazirmatn: "var(--font-vazirmatn)",
      },
    },
  },
  plugins: [],
};
