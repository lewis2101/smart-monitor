import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

export type MonitoringSegmentEmits = {
  (e: "render-cars", value: VehicleItem[]): void;
  (e: "fit-bounds", value: VehicleItem): void;
};
