module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      bgprimary: "#202020",
      bgsecondary: "#464646",
      acprimary: "#fd7777",
      acsecondary: "#ff4d4d",
      brightness: {
        25: '.25'
      }
    },
  },
  plugins: [],
}
