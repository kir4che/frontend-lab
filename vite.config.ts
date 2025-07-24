/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // 讓 describe/it/expect 可以不 import 直接用
    setupFiles: './src/setupTests.ts', // 讓 jest-dom 自動載入
  },
});