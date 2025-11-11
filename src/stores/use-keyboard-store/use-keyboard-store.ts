import { useIsSupport } from "@/composables/native/use-is-support.ts";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";
import { onBeforeUnmount, readonly, ref } from "vue";
import { defineStore } from "pinia";

export const useKeyboardStore = defineStore("keyboard-store", () => {
  const isVisibleKeyboard = ref(false);
  const keyboardHeight = ref(0);

  const initListeners = async () => {
    const isSupport = useIsSupport();

    if (!isSupport.value) {
      await Promise.resolve();
    }

    const accessoryBar = Keyboard.setAccessoryBarVisible({ isVisible: true });

    const resizeMode = Keyboard.setResizeMode({
      mode: KeyboardResize.Ionic,
    });

    const show = Keyboard.addListener("keyboardWillShow", (info) => {
      keyboardHeight.value = info.keyboardHeight;
      isVisibleKeyboard.value = true;
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      isVisibleKeyboard.value = false;
    });
    await Promise.all([accessoryBar, resizeMode, show, hide]);
  };

  const disableScroll = async () => {
    const isSupport = useIsSupport();

    if (isSupport.value) {
      await Keyboard.setScroll({ isDisabled: true });
    }
  };

  initListeners();

  onBeforeUnmount(async () => {
    await Keyboard.removeAllListeners();
  });

  return {
    isVisibleKeyboard: readonly(isVisibleKeyboard),
    disableScroll,
  };
});
