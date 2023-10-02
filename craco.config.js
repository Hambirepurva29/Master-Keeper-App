const VitePlugin = require('vite-plugin-react');

module.exports = {
  webpack: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
};