import { StatusBar, Style } from "@capacitor/status-bar";
import { useIsSupport } from "@/composables/native/use-is-support.ts";
import { computed, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { CommonRoutes, MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";

enum Color {
  main = "main",
  secondary = "secondary",
}

type StatusBarColor = {
  bg: string;
  text: Style;
};

type AllRoutesType = MainTabRoutes & CommonRoutes & OrderRoutes;

const statusBarColors: Record<Color, StatusBarColor> = {
  main: {
    // bg: "#ffffff",
    // bg: "#066046",
    // bg: "linear-gradient(180deg, #066046 50%, #ffffff 50%)",
    bg: "background: linear-gradient(180deg, $main-color 50%, #ffffff 50%);",
    text: Style.Dark,
  },
  secondary: {
    bg: "#ffffff",
    text: Style.Light,
  },
};

const routeNamesStatusBarColors: Record<AllRoutesType, Color> = {
  // main-tabs
  [MainTabRoutes.home]: Color.main,
  [MainTabRoutes.docs]: Color.main,
  [MainTabRoutes.orders]: Color.main,
  [MainTabRoutes.service]: Color.main,
  //
  [MainTabRoutes.briefing]: Color.main,
  [OrderRoutes.newOrder]: Color.main,
  [CommonRoutes.login]: Color.main,
  [CommonRoutes.registration]: Color.main,
  [CommonRoutes.learning]: Color.main,
  [CommonRoutes.profile]: Color.main,
  [CommonRoutes.notifications]: Color.main,
  [CommonRoutes.fileView]: Color.main,
  [CommonRoutes.search]: Color.main,
  [OrderRoutes.order]: Color.main,
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
  function initRouteWatch() {
    const route = useRoute();
    const currentRouteName = computed(() => route.name as AllRoutesType);

    const unwatch = watch(
      currentRouteName,
      async () => {
        const color = routeNamesStatusBarColors[currentRouteName.value] as Color;
        if (color) await setNativeColors(color as Color);
      },
      {
        immediate: true,
      },
    );
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
