import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import { execSync } from 'node:child_process';
import os from 'node:os';

function getLanIp(): string | undefined {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    if (/vEthernet|wsl|loopback|virtual|docker/i.test(name)) continue;
    const list = nets[name];
    if (!list) continue;
    for (const net of list) {
      if ((net.family === 'IPv4' || (net.family as unknown) === 4) && !net.internal && !net.address.startsWith('169.254')) {
        return net.address;
      }
    }
  }
  return undefined;
}

function lanUrlPlugin(): Plugin {
  const printBanner = (port: number, mode: string) => {
    const lanIp = getLanIp();
    console.log('\n  ======================================================');
    console.log(`  🐱 FrankieDoku URLs to Use (${mode}):`);
    console.log(`     🖥️  Desktop Browser:  http://localhost:${port}/`);
    if (lanIp) {
      console.log(`     📱  Pixel 9 / Phone:  http://${lanIp}:${port}/`);
    }
    console.log('  ======================================================\n');
  };

  return {
    name: 'lan-url-banner',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();
        const port = typeof address === 'object' && address ? address.port : 3000;
        setTimeout(() => printBanner(port, 'Development'), 150);
      });
    },
    configurePreviewServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();
        const port = typeof address === 'object' && address ? address.port : 4173;
        setTimeout(() => printBanner(port, 'Preview'), 150);
      });
    }
  };
}

function getCommitDate(): string {
  try {
    const out = execSync('git log -1 --format=%cI', { encoding: 'utf-8' }).trim();
    if (out) return out;
  } catch {}
  return new Date().toISOString();
}

function getBuildVersion(): string {
  const commitIso = getCommitDate();
  let date: Date;

  if (commitIso.includes('Z') || /[+-]\d{2}:\d{2}$/.test(commitIso)) {
    date = new Date(commitIso);
  } else {
    const match = commitIso.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):/);
    if (match) {
      const yy = match[1].slice(-2);
      const mm = match[2];
      const dd = match[3];
      const hh = match[4];
      return `v2.${yy}${mm}.${dd}${hh}`;
    }
    date = new Date(commitIso);
  }

  const targetMs = date.getTime() - 7 * 60 * 60 * 1000;
  const target = new Date(targetMs);
  const yy = String(target.getUTCFullYear()).slice(-2);
  const mm = String(target.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(target.getUTCDate()).padStart(2, '0');
  const hh = String(target.getUTCHours()).padStart(2, '0');

  return `v2.${yy}${mm}.${dd}${hh}`;
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(getBuildVersion()),
  },
  base: './',
  plugins: [
    react(),
    lanUrlPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'cat-icon.svg'],
      manifest: {
        name: 'FrankieDoku - Cozy Cat Logic Puzzle',
        short_name: 'FrankieDoku',
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
  },
  preview: {
    port: 4173,
    host: true
  }
});
