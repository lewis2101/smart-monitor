import { type MaybeRefOrGetter, ref, toValue } from "vue";
import maplibregl from "maplibre-gl";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import type { BoundOptions } from "@/composables/map/types.ts";

const ROUTE_SOURCE_ID = "routes-source";
const ROUTE_LAYER_ID = "routes-layer";

const POINTS_SOURCE_ID = "route-points-source";
const POINTS_LAYER_ID = "route-points-layer";

const EMPTY_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

export const useMapPolyline = ({ mapRef }: { mapRef?: MaybeRefOrGetter<maplibregl.Map | null> }) => {
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

  const fitBounds = (routes: AddressSelectorRoute[], options: BoundOptions) => {
    const map = toValue(mapRef);
    if (!map || !routes.length) return;

    // reverse [lat, lng] -> [lng, lat]
    const allPoints = routes.flatMap((r) => r.points).map(([lat, lng]) => [lng, lat] as [number, number]);

    if (!allPoints.length) return;

    const bounds = new maplibregl.LngLatBounds();

    allPoints.forEach(([lat, lng]) => {
      bounds.extend([lat, lng]);
    });

    map.fitBounds(bounds, options);
  };

  const paintRoute = (routes: AddressSelectorRoute[], options?: BoundOptions) => {
    const map = toValue(mapRef);
    if (!map) return;

    const source = map.getSource(ROUTE_SOURCE_ID) as maplibregl.GeoJSONSource | undefined;

    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features: routes.map(
        (route, index): GeoJSON.Feature => ({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route.points.map(([lat, lng]) => [lng, lat] as [number, number]),
          },
          properties: {
            id: index,
            from: route.wp1,
            to: route.wp2,
            color: route.color,
          },
        }),
      ),
    });

    paintPins(routes);

    if (options) {
      fitBounds(routes, options);
    }
  };

  const paintPins = (routes: AddressSelectorRoute[]) => {
    const map = toValue(mapRef);
    if (!map) return;

    const source = map.getSource(POINTS_SOURCE_ID) as maplibregl.GeoJSONSource | undefined;

    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features: routes.flatMap((route, index): GeoJSON.Feature[] => [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [route.point1.x, route.point1.y],
          },
          properties: {
            routeId: index,
            type: "from",
            name: route.point1.formatted_path,
            color: route.color,
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [route.point2.x, route.point2.y],
          },
          properties: {
            routeId: index,
            type: "to",
            name: route.point2.formatted_path,
            color: route.color,
          },
        },
      ]),
    });
  };

  return {
    init,
    isReady,
    paintRoute,
  };
};
