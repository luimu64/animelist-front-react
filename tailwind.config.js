module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      bgprimary: "#202020",
      bgsecondary: "#464646",
      acprimary: "#fd7777",
      acsecondary: "#ff4d4d"
    },
  },
  variants: {
    extend: {
      filter: ['hover']
    },
  },
  plugins: [],
}
