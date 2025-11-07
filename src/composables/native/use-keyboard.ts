import { useIsSupport } from "@/composables/native/use-is-support.ts";
import { Keyboard } from "@capacitor/keyboard";

export const useKeyboard = () => {
  return {
    disableScroll: async () => {
      const isSupport = useIsSupport();

      if (isSupport.value) {
        await Keyboard.setScroll({ isDisabled: true });
      }
    },
  };
};
