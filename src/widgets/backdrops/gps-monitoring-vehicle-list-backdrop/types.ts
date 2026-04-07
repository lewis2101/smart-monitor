import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

export type GpsMonitoringVehicleListBackdropProps = {
  initialValue?: VehicleItem[];
} & BackdropComponentProps<(value: VehicleItem[]) => any>;
