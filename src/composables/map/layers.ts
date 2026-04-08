import { CARS_SOURCE_KEY } from "@/composables/map/sources.ts";
import maplibregl from "maplibre-gl";

export const CARS_LAYER_KEY = "cars-layer";

export const getVehicleLayer = (): maplibregl.AddLayerObject => ({
  id: CARS_LAYER_KEY,
  type: "symbol",
  source: CARS_SOURCE_KEY,
  layout: {
    "icon-image": ["get", "icon"],
    "icon-size": 0.5,
    "icon-rotate": ["get", "angle"],
    "icon-rotation-alignment": "map",
    "text-field": ["get", "name"],
    "text-offset": [0, 1.4],
    "text-size": 12,
    "text-anchor": "top",
  },
});
