import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { executeWithWaitAtLeast } from "@/utils/waitAtLeast.ts";

export const useGlobalSpinner = defineStore("global-spinner", () => {
  const isVisible = ref(false);

  const show = () => (isVisible.value = true);
  const hide = () => (isVisible.value = false);

  const execute = async <T>(callback: () => Promise<T>, ms = 300) => {
    show();
    try {
      const data = await executeWithWaitAtLeast<T>(callback, ms);
      return data;
    } catch (e) {
      throw e;
    } finally {
      hide();
    }
  };

  return {
    isVisible: readonly(isVisible),
    show,
    hide,
    execute,
  };
});
