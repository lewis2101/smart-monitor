import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { executeWithWaitAtLeast } from "@/utils/waitAtLeast.ts";

export const useGlobalSpinner = defineStore("global-spinner", () => {
  const isVisible = ref(false);

  const show = () => (isVisible.value = true);
  const hide = () => (isVisible.value = false);

  const execute = async (callback: () => Promise<unknown>, ms = 300) => {
    show();
    await executeWithWaitAtLeast(callback, ms);
    hide();
  };

  return {
    isVisible: readonly(isVisible),
    show,
    hide,
    execute,
  };
});
