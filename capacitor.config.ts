import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.smartfleet.app",
  appName: "SmartFleet",
  webDir: "dist",
  server: {
    // url: "http://localhost:5173",
    url: "http://192.168.100.144:5173",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      // launchShowDuration: 2000,
      // launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
