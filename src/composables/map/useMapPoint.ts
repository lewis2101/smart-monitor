import { type MaybeRefOrGetter, ref, toValue } from "vue";
import maplibregl from "maplibre-gl";
import type { AddressData } from "@/components/step-generator/AddressSelector/use-addresses.ts";
import type { BoundOptions } from "@/composables/map/types.ts";

const ROUTE_SOURCE_ID = "pin-source";
const ROUTE_LAYER_ID = "pins-layer";

const POINTS_SOURCE_ID = "route-points-source";
const POINTS_LAYER_ID = "route-points-layer";

const EMPTY_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

export const useMapPoints = ({ mapRef }: { mapRef?: MaybeRefOrGetter<maplibregl.Map | null> }) => {
  const isReady = ref(false);

  const getMap = () => {
    const map = toValue(mapRef);
    if (!map) throw new Error("MAP IS NOT INIT");
    return map;
  };

  const addSourceIfNotExists = (map: maplibregl.Map, id: string) => {
    if (!map.getSource(id)) {
      map.addSource(id, {
        type: "geojson",
        data: EMPTY_GEOJSON,
      });
    }
  };

  const ensureLayers = (map: maplibregl.Map) => {
    addSourceIfNotExists(map, ROUTE_SOURCE_ID);

    if (!map.getLayer(ROUTE_LAYER_ID)) {
      map.addLayer({
        id: ROUTE_LAYER_ID,
        type: "line",
        source: ROUTE_SOURCE_ID,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": 4,
          "line-color": ["coalesce", ["get", "color"], "#3b82f6"],
        },
      });
    }

    addSourceIfNotExists(map, POINTS_SOURCE_ID);

    if (!map.getLayer(POINTS_LAYER_ID)) {
      map.addLayer({
        id: POINTS_LAYER_ID,
        type: "circle",
        source: POINTS_SOURCE_ID,
        paint: {
          "circle-radius": 8,
          "circle-color": ["coalesce", ["get", "color"], "#3b82f6"],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    }
  };

  const init = () => {
    const map = getMap();

    const onLoad = () => {
      ensureLayers(map);
      isReady.value = true;
    };

    if (map.isStyleLoaded()) {
      onLoad();
    } else {
      map.once("load", onLoad);
    }
  };

  const fitBounds = (paths: AddressData[], options: BoundOptions) => {
    const map = toValue(mapRef);
    if (!map || !paths.length) return;

    const bounds = new maplibregl.LngLatBounds();

    paths.forEach((path) => {
      if (typeof path.lng === "number" && typeof path.lat === "number") {
        bounds.extend([path.lng, path.lat]);
      }
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, options);
    }
  };

  const paintPins = (paths: AddressData[], options?: BoundOptions) => {
    const map = toValue(mapRef);
    if (!map) return;

    const source = map.getSource(POINTS_SOURCE_ID) as maplibregl.GeoJSONSource | undefined;

    if (!source) return;

    const validPaths = paths.filter(
      (p): p is AddressData & { lng: number; lat: number } => typeof p.lng === "number" && typeof p.lat === "number",
    );

    source.setData({
      type: "FeatureCollection",
      features: validPaths.map((path, index) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [path.lng, path.lat],
        },
        properties: {
          routeId: index,
          type: "from",
          name: path.point?.formatted_path ?? "",
          color: "red",
        },
      })),
    });

    if (options) {
      fitBounds(validPaths, options);
    }
  };

  return {
    init,
    isReady,
    paintPins,
  };
};
