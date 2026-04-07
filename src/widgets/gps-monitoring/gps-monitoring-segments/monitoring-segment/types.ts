import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

export type MonitoringSegmentEmits = {
  (e: "render-car", value: VehicleItem): void;
};
