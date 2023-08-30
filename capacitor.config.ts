import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sapp.todo',
  appName: 'SAPP TODO',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
