import { type Component, markRaw } from "vue";
import Camera from "@/components/backdrops/camera.vue";

type BackdropArgs = Record<string, unknown>;
type BackdropEmits = Record<string, (...args: any[]) => unknown>;
export type BackdropsKey = "camera";

export type BackdropItem<C = Component> = {
  title: string;
  component: C;
  args: BackdropArgs;
  emits: BackdropEmits;
};

function defineBackdropItem<C extends Component>(item: BackdropItem<C>) {
  return item;
}

export const configBackdropItems = {
  camera: defineBackdropItem<typeof Camera>({
    title: "Прикрепить",
    component: markRaw(Camera),
    args: {},
    emits: {},
  }),
};
