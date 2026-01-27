import { type MaybeRefOrGetter, ref, toValue } from "vue";
import maplibregl from "maplibre-gl";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";

const SOURCE_ID = "routes-source";
const LAYER_ID = "routes-layer";

const POINTS_SOURCE_ID = "route-points-source";
const POINTS_LAYER_ID = "route-points-layer";

export const useMapPolyline = ({ mapRef }: { mapRef?: MaybeRefOrGetter<maplibregl.Map | null> }) => {
  const isReady = ref(false);

  const init = () => {
    const map = toValue(mapRef);
    if (!map) throw new Error("MAP IS NOT INIT");

    if (map.getSource(SOURCE_ID)) return;

    map.on("load", () => {
      if (!map.getSource(SOURCE_ID)) {
        map.addSource(SOURCE_ID, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: LAYER_ID,
          type: "line",
          source: SOURCE_ID,
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

      if (!map.getSource(POINTS_SOURCE_ID)) {
        map.addSource(POINTS_SOURCE_ID, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: POINTS_LAYER_ID,
          type: "circle",
          source: POINTS_SOURCE_ID,
          paint: {
            "circle-radius": 8,
            "circle-color": [
              "coalesce",
              ["get", "color"],
              "#3b82f6", // fallback
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });
      }

      isReady.value = true;
    });
  };

  const fitBounds = (paths: AddressSelectorRoute[], boundPadding: number) => {
    const map = toValue(mapRef);
    if (!map) return;

    // Реверсим
    const allPoints = paths.flatMap((p) => p.points).map(([a, b]) => [b, a]);

    if (allPoints.length) {
      const bounds = allPoints.reduce(
        (b, c) => b.extend(c as [number, number]),
        new maplibregl.LngLatBounds(allPoints[0], allPoints[0]),
      );

      map.fitBounds(bounds, { padding: boundPadding });
    }
  };

  const paintRoute = (paths: AddressSelectorRoute[], options?: { boundPadding: number }) => {
    const map = toValue(mapRef);
    if (!map) return;

    const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features: paths.map((path, index) => {
        return {
          type: "Feature",
          geometry: {
            type: "LineString",
            // Реверс координат
            coordinates: path.points.map(([a, b]) => [b, a]),
          },
          properties: {
            id: index,
            from: path.wp1,
            to: path.wp2,
            color: path.color,
          },
        };
      }),
    });

    paintPins(paths);

    if (options?.boundPadding) {
      fitBounds(paths, options.boundPadding);
    }
  };

  const paintPins = (paths: AddressSelectorRoute[]) => {
    const map = toValue(mapRef);
    if (!map) return;

    const pointSource = map.getSource(POINTS_SOURCE_ID) as maplibregl.GeoJSONSource;
    if (!pointSource) return;

    pointSource.setData({
      type: "FeatureCollection",
      features: paths.flatMap((path, index) => [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [path.point1.x, path.point1.y],
          },
          properties: {
            routeId: index,
            type: "from",
            name: path.point1.formatted_path,
            color: path.color,
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [path.point2.x, path.point2.y],
          },
          properties: {
            routeId: index,
            type: "to",
            name: path.point2.formatted_path,
            color: path.color,
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
