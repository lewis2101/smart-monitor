import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

export type VehicleGroup = {
  id: string;
  name: string;
  vehicles: VehicleItem[];
};
