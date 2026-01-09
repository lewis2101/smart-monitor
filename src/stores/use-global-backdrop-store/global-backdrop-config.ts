import {type Component, markRaw, type Raw} from "vue";
import PickBackdrop from "@/widgets/backdrops/pick-backdrop.vue";
import MapBackdrop from "@/widgets/backdrops/map-backdrop.vue";
import FilterBackdrop from "@/widgets/backdrops/filter-backdrop.vue";
import SelectBackdrop from "@/widgets/backdrops/select-backdrop.vue";
import DatePickerBackdrop from "@/widgets/backdrops/date-picker-backdrop.vue";
import type {ExtractProps} from "@/utils/extractProps.ts";

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
  pick: markRaw(PickBackdrop),
  map: markRaw(MapBackdrop),
  filter: markRaw(FilterBackdrop),
  select: markRaw(SelectBackdrop),
  "date-picker": markRaw(DatePickerBackdrop)
} as const;
