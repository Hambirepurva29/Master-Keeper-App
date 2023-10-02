import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path');
const { defineConfig } = require('vite');
const reactRefresh = require('@vitejs/plugin-react-refresh');
const tsconfigPaths = require('vite-tsconfig-paths');

module.exports = defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
