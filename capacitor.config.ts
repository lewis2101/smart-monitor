import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.smartfleet.app",
  appName: "SmartFleet",
  webDir: "dist",
  server: {
    url: "http://localhost:5173",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV === "development") {
  config.server.url = "http://localhost:5173";
}

export default config;
