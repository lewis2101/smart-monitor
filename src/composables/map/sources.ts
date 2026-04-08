import maplibregl from "maplibre-gl";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { CARS_ICON_KEY } from "@/composables/map/images.ts";

export const CARS_SOURCE_KEY = "cars-source";

export const getEmptySource = (): maplibregl.SourceSpecification => ({
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [],
  },
});

export const buildVehicleSource = (vehicles: VehicleItem[]): GeoJSON.GeoJSON => ({
  type: "FeatureCollection",
  features: vehicles.map((item) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [item.mess.longitude, item.mess.latitude],
    },
    properties: {
      id: item.id,
      name: item.name,
      icon: CARS_ICON_KEY,
      angle: item.mess.angle,
    },
  })),
});
