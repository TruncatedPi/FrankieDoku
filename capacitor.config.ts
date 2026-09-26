import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dan.frankiedoku',
  appName: 'FrankieDoku',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: "#fdf8f4",
      showSpinner: false
    }
  }
};

export default config;
