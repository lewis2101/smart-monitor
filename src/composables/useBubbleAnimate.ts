import { type MaybeRefOrGetter, toValue } from "vue";
import { useEventListener } from "@vueuse/core";

export const useBubbleAnimate = (
  root: MaybeRefOrGetter<HTMLDivElement | null>,
  isDisabled?: MaybeRefOrGetter<boolean>,
) => {
  // if (toValue(isDisabled)) return;

  const baseClasses = ["animate-pressable"];
  toValue(root)?.classList.add(...baseClasses);

  useEventListener(root, "touchstart", () => {
    // if (toValue(isDisabled)) return;

    toValue(root)?.classList.remove("animate-pressable_release");
  });

  useEventListener(root, ["touchend", "touchcancel"], () => {
    // if (toValue(isDisabled)) return;
    toValue(root)?.classList.add("animate-pressable_release");
  });
};
