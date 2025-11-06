import { StatusBar, Style } from "@capacitor/status-bar";

enum Color {
  main = "main",
  secondary = "secondary",
}

type StatusBarColor = {
  bg: string;
  text: Style;
};

const statusBarColors: Record<Color, StatusBarColor> = {
  main: {
    bg: "#041A4B",
    text: Style.Dark,
  },
  secondary: {
    bg: "#ffffff",
    text: Style.Light,
  },
};

async function setNativeColors(key: Color) {
  try {
    // const bg = StatusBar.setBackgroundColor({ color: statusBarColors[key].bg });
    const html = document.querySelector("html")!;
    html.style.background = statusBarColors[key].bg;
    const text = StatusBar.setStyle({ style: statusBarColors[key].text });
    const overlay = StatusBar.setOverlaysWebView({ overlay: true });
    await Promise.all([text, overlay]);
  } catch (e) {
    console.error("Error change native color: ", e);
  }
}

export function useStatusBarColor() {
  return {
    setMainColor: () => setNativeColors(Color.main),
    setSecondaryColor: () => setNativeColors(Color.secondary),
  };
}
