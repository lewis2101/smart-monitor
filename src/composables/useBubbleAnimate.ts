import type { MaybeRefOrGetter, Ref } from "vue";
import { useEventListener } from "@vueuse/core";

export const useBubbleAnimate = (root: Ref<HTMLDivElement | null>, isDisabled?: MaybeRefOrGetter<boolean>) => {
  root.value?.classList.add(...["animate-pressable", "animate-pressable_pressed"]);

  useEventListener(root, "touchstart", () => {
    if (isDisabled) return;
    root.value?.classList.remove("animate-pressable_release");
  });

  useEventListener(root, ["touchend", "touchcancel"], () => {
    if (isDisabled) return;
    root.value?.classList.add("animate-pressable_release");
  });
};
