import { defineStore } from "pinia";
import { type Component, reactive } from "vue";
import {
  type BackdropItem,
  type BackdropsKey,
  configBackdropItems,
} from "@/stores/use-global-backdrop-store/config.ts";
import type { ExtractProps } from "@/utils/extractProps.ts";
import type { ExtractEmit } from "@/utils/extractEmits.ts";

export const useGlobalBackdropStore = defineStore("global-backdrop-store", () => {
  const backdrops = reactive<
    Array<
      BackdropItem & {
        model: boolean;
        args: ExtractProps<Component>;
        emits: ExtractEmit<Component>;
      }
    >
  >([]);

  function push<K extends BackdropsKey>(
    key: K,
    options?: {
      args?: ExtractProps<(typeof configBackdropItems)[K]["component"]>;
      emits?: ExtractEmit<(typeof configBackdropItems)[K]["component"]>;
    },
  ) {
    backdrops.push({
      ...configBackdropItems[key],
      model: true,
      args: options?.args || {},
      emits: options?.emits || {},
    });
  }

  return {
    backdrops,
    push,
  };
});
