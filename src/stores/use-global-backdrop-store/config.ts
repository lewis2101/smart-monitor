import { type Component, markRaw } from "vue";
import CameraBackdrop from "@/widgets/backdrops/camera-backdrop.vue";
import MapBackdrop from "@/widgets/backdrops/map-backdrop.vue";

type BackdropArgs = Record<string, unknown>;
type BackdropEmits = Record<string, (...args: any[]) => unknown>;
export type BackdropsKey = "camera" | "map";

export type BackdropItem<C = Component> = {
  title: string;
  component: C;
  args: BackdropArgs;
  emits: BackdropEmits;
};

function defineBackdropItem<C extends Component>(item: BackdropItem<C>) {
  return item;
}

export const configBackdropItems: Record<BackdropsKey, ReturnType<typeof defineBackdropItem>> = {
  camera: defineBackdropItem<typeof CameraBackdrop>({
    title: "Прикрепить",
    component: markRaw(CameraBackdrop),
    args: {},
    emits: {},
  }),
  map: defineBackdropItem<typeof MapBackdrop>({
    title: "Выберите точку на карте",
    component: markRaw(MapBackdrop),
    args: {},
    emits: {},
  }),
};
