import { type MaybeRefOrGetter, type Ref, toValue } from "vue";
import { useEventListener } from "@vueuse/core";

export const useBubbleAnimate = (root: Ref<HTMLDivElement | null>, isDisabled?: MaybeRefOrGetter<boolean>) => {
  if (toValue(isDisabled)) return;

  const baseClasses = ["animate-pressable"];
  root.value?.classList.add(...baseClasses);

  useEventListener(root, "touchstart", () => {
    if (toValue(isDisabled)) return;

    root.value?.classList.remove("animate-pressable_release");
  });

  useEventListener(root, ["touchend", "touchcancel"], () => {
    if (toValue(isDisabled)) return;
    root.value?.classList.add("animate-pressable_release");
  });
};
