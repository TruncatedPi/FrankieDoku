import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import { execSync } from 'node:child_process';

function getCommitDate(): string {
  try {
    const out = execSync('git log -1 --format=%cI', { encoding: 'utf-8' }).trim();
    if (out) return out;
  } catch {}
  return new Date().toISOString();
}

function getDayOfYear(year: number, month: number, day: number): number {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysBeforeMonth = [
    0, 31, 31 + (isLeap ? 29 : 28), 31 + (isLeap ? 29 : 28) + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30, 31 + (isLeap ? 29 : 28) + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30, 31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31, 31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31,
    31 + (isLeap ? 29 : 28) + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30
  ];
  return daysBeforeMonth[month - 1] + day;
}

function getBuildVersion(): string {
  const commitIso = getCommitDate();
  const match = commitIso.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    const yy = String(year).slice(-2);
    const doy = String(getDayOfYear(year, month, day)).padStart(3, '0');
    const hh = match[4];
    return `v1.${yy}${doy}.${hh}`;
  }
  const now = new Date();
  const year = now.getFullYear();
  const yy = String(year).slice(-2);
  const doy = String(getDayOfYear(year, now.getMonth() + 1, now.getDate())).padStart(3, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  return `v1.${yy}${doy}.${hh}`;
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(getBuildVersion()),
  },
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'cat-icon.svg'],
      manifest: {
        name: 'SchroDoku - Cozy Cat Logic Puzzle',
        short_name: 'SchroDoku',
        description: 'An ad-free, cozy cat-themed Queens/Star Battle logic puzzle game.',
        theme_color: '#fdf6ee',
        background_color: '#fdf6ee',
        display: 'standalone',
        start_url: './',
        scope: './',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      }
    })
  ],
  server: {
    port: 3000,
    host: true
  }
});
