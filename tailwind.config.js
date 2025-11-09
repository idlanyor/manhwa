/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Playpen Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'theme-bg-primary': 'rgb(var(--bg-primary) / <alpha-value>)',
        'theme-bg-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'theme-bg-tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        'theme-text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'theme-text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'theme-text-tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
        'theme-border': 'rgb(var(--border-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Remove unused styles
  safelist: [],
}