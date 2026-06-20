/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Lets you use describe/it/expect without importing them in every file.
    globals: true,
    // jsdom gives a fake DOM. Pure-function tests don't need it, but
    // component tests (coming later) do. Harmless to enable now.
    environment: 'jsdom',
    // Runs once before the test suite — wires up jest-dom matchers.
    setupFiles: './src/test/setup.ts',
  },
});
