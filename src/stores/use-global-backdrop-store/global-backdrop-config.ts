import { type Component, markRaw, type Raw } from "vue";
import CameraBackdrop from "@/widgets/backdrops/camera-backdrop.vue";
import MapBackdrop from "@/widgets/backdrops/map-backdrop.vue";
import FilterBackdrop from "@/widgets/backdrops/filter-backdrop.vue";
import SortBackdrop from "@/widgets/backdrops/sort-backdrop.vue";
import type { ExtractProps } from "@/utils/extractProps.ts";

export type BackdropComponentProps<S = (...args: any[]) => Promise<any>, F = (...args: any[]) => Promise<any>> = {
  onSuccess?: S;
  onFailure?: F;
};
export type BackdropKeys = keyof typeof backdropComponents;
export type BackdropProps<K extends BackdropKeys> = ExtractProps<(typeof backdropComponents)[K]> &
  BackdropComponentProps;

export type BackdropItem<C extends BackdropKeys> = {
  component: Raw<Component>;
  title: string;
  props: BackdropProps<C>;
};

export const backdropComponents = {
  camera: markRaw(CameraBackdrop),
  map: markRaw(MapBackdrop),
  filter: markRaw(FilterBackdrop),
  sort: markRaw(SortBackdrop),
} as const;
