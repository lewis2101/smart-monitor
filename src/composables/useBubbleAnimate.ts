import type { Ref } from "vue";
import { useEventListener } from "@vueuse/core";

export const useBubbleAnimate = (root: Ref<HTMLDivElement | null>) => {
  root.value?.classList.add(...["animate-pressable", "animate-pressable_pressed"]);

  useEventListener(root, "touchstart", () => {
    root.value?.classList.remove("animate-pressable_release");
  });

  useEventListener(root, ["touchend", "touchcancel"], () => {
    root.value?.classList.add("animate-pressable_release");
  });
};
