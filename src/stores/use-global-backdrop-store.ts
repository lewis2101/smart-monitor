import { defineStore } from "pinia";
import { type Component, markRaw, reactive } from "vue";
import Camera from "@/components/backdrops/camera.vue";

type BackdropItem = {
  title: string;
  component: Component;
};

type BackdropsKey = "camera";

const configBackdropItems: Record<BackdropsKey, BackdropItem> = {
  camera: {
    title: "Прикрепить",
    component: markRaw(Camera),
  },
};

export const useGlobalBackdropStore = defineStore("global-backdrop-store", () => {
  const backdrops = reactive<Array<BackdropItem & { model: boolean; args?: Record<string, unknown> }>>([]);

  const push = async (key: BackdropsKey, args?: Record<string, unknown>) => {
    backdrops.push({
      ...configBackdropItems[key],
      model: true,
      args,
    });
  };

  return {
    backdrops,
    push,
  };
});
