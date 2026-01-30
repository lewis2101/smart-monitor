import { type MaybeRefOrGetter, type Ref, toValue, watch } from "vue";
import { useEventListener } from "@vueuse/core";

export const useBubbleAnimate = (root: Ref<HTMLDivElement | null>, isDisabled?: MaybeRefOrGetter<boolean>) => {
  const baseClasses = ["animate-pressable", "animate-pressable_pressed"];

  useEventListener(root, "touchstart", () => {
    if (toValue(isDisabled)) return;
    root.value?.classList.add(...baseClasses);
    root.value?.classList.remove("animate-pressable_release");
  });

  useEventListener(root, ["touchend", "touchcancel"], () => {
    if (toValue(isDisabled)) return;
    root.value?.classList.add(...baseClasses, "animate-pressable_release");
  });
};
