// tailwind.config.js
const config = {
 
   content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
 darkMode: 'class', // or 'media' depending on your preference
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
