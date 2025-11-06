import { computed } from "vue";
import { Capacitor } from "@capacitor/core";

export const useIsSupport = () => {
  return computed(() => Capacitor.isNativePlatform());
};
