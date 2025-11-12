import { StatusBar, Style } from "@capacitor/status-bar";
import { useIsSupport } from "@/composables/native/use-is-support.ts";
import { computed, onBeforeUnmount, watch, type WatchOptions } from "vue";
import { useRoute } from "vue-router";

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
  const isSupport = useIsSupport();

  try {
    const html = document.querySelector("html")!;
    html.style.background = statusBarColors[key].bg;

    if (!isSupport.value) {
      return;
    }

    // const bg = StatusBar.setBackgroundColor({ color: statusBarColors[key].bg });
    const text = StatusBar.setStyle({ style: statusBarColors[key].text });
    const overlay = StatusBar.setOverlaysWebView({ overlay: true });
    await Promise.all([text, overlay]);
  } catch (e) {
    console.error("Error change native color: ", e);
  }
}

export function useStatusBarColor() {
  function initRouteWatch<T>(callback: (value: T) => void) {
    const route = useRoute();
    const currentRouteName = computed(() => route.name as T);

    const unwatch = watch(currentRouteName, callback, {
      immediate: true,
    });
    onBeforeUnmount(() => unwatch());
  }

  function setMainColor() {
    return setNativeColors(Color.main);
  }

  function setSecondaryColor() {
    return setNativeColors(Color.secondary);
  }

  return {
    setMainColor,
    setSecondaryColor,
    initRouteWatch,
  };
}
