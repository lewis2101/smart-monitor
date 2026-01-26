import { type MaybeRefOrGetter, reactive, toValue, watch } from "vue";
import maplibregl from "maplibre-gl";
import pinUrl from "@/assets/images/pin.png?url";
import { debounce } from "@/utils/debounce.ts";

export type MapCenterPinProps = {
  placeholder?: string;
  initialCoords?: {
    lng: number | null;
    lat: number | null;
  };
};

export const useMapCenterPin = ({
  mapRef,
  props,
}: {
  mapRef?: MaybeRefOrGetter<maplibregl.Map | null>;
  props: MapCenterPinProps;
}) => {
  const selectedCoords = reactive<{
    lng: number | null;
    lat: number | null;
  }>({
    lng: props?.initialCoords?.lng || null,
    lat: props?.initialCoords?.lat || null,
  });

  const initCenterPin = (map: maplibregl.Map) => {
    if (!map.getSource("center-pin")) {
      map.addSource("center-pin", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: null,
              geometry: {
                type: "Point",
                coordinates: [map.getCenter().lng, map.getCenter().lat],
              },
            },
          ],
        },
      });
    }

    if (!map.getLayer("center-pin-layer")) {
      map.addLayer({
        id: "center-pin-layer",
        type: "symbol",
        source: "center-pin",
        layout: {
          "icon-image": "center-pin",
          "icon-size": 1,
          "icon-anchor": "bottom",
          "icon-offset": [0, 0],
          "icon-allow-overlap": true,
        },
      });
    }
  };

  const loadPinImage = (map: maplibregl.Map) => {
    if (map.hasImage("center-pin")) return;

    const img = new Image();
    img.width = 200;
    img.height = 200;
    img.src = pinUrl;

    img.onload = () => {
      map.addImage("center-pin", img, {
        pixelRatio: window.devicePixelRatio || 2,
      });

      initCenterPin(map);
    };
  };

  const animateOffset = (map: maplibregl.Map, from: number, to: number, duration = 150) => {
    const start = performance.now();

    function frame(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * (2 - t);

      const y = from + (to - from) * eased;

      map.setLayoutProperty("center-pin-layer", "icon-offset", [0, y]);

      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  };

  const movePin = (map: maplibregl.Map) => {
    const center = map.getCenter();

    const source = map.getSource("center-pin") as maplibregl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: null,
          geometry: {
            type: "Point",
            coordinates: [center.lng, center.lat],
          },
        },
      ],
    });
  };

  const init = () => {
    const map = toValue(mapRef);
    if (!map) {
      throw new Error("MAP IS NOT INIT");
    }

    const setup = () => loadPinImage(map);

    if (map.isStyleLoaded()) {
      setup();
    } else {
      map.on("style.load", setup);
    }

    map.on("movestart", () => {
      animateOffset(map, 0, -12);
    });

    map.on("moveend", () => {
      animateOffset(map, -12, 0);
    });

    map.on("move", () => {
      movePin(map);
    });

    const debouncedGetCenter = debounce(() => {
      const { lng, lat } = map.getCenter();
      selectedCoords.lng = lng;
      selectedCoords.lat = lat;
    }, 300);

    map.on("moveend", () => {
      debouncedGetCenter();
    });
  };

  return {
    init,
    selectedCoords,
  };
};
