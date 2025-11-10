import { useIsSupport } from "@/composables/native/use-is-support.ts";
import { Keyboard } from "@capacitor/keyboard";
import { onBeforeUnmount, onMounted, readonly, ref } from "vue";
import { defineStore } from "pinia";

export const useKeyboardStore = defineStore("keyboard-store", () => {
  const isVisibleKeyboard = ref(false);
  const keyboardHeight = ref(0);

  const initListeners = async () => {
    const isSupport = useIsSupport();

    if (!isSupport.value) {
      await Promise.resolve();
    }

    const show = Keyboard.addListener("keyboardWillShow", (info) => {
      keyboardHeight.value = info.keyboardHeight;
      isVisibleKeyboard.value = true;
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      isVisibleKeyboard.value = false;
    });
    await Promise.all([show, hide]);
  };

  const disableScroll = async () => {
    const isSupport = useIsSupport();

    if (isSupport.value) {
      await Keyboard.setScroll({ isDisabled: true });
    }
  };

  onMounted(async () => {
    await initListeners();
  });

  onBeforeUnmount(async () => {
    await Keyboard.removeAllListeners();
  });

  return {
    isVisibleKeyboard: readonly(isVisibleKeyboard),
    disableScroll,
  };
});
