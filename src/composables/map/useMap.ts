import { computed, nextTick, ref } from "vue";
import maplibregl from "maplibre-gl";

type BoundsArgs = {
  lon: number;
  lat: number;
};

export const useMap = () => {
  const mapRef = ref<{ map: maplibregl.Map }>();

  const addLayer = (layer: maplibregl.AddLayerObject) => {
    if (!map.value) {
      console.log("MAP NOT EXISTS");
      return;
    }

    if (map.value.getLayer(layer.id)) {
      return;
    }

    map.value.addLayer(layer);
  };

  const addSource = (id: string, source: maplibregl.SourceSpecification | maplibregl.CanvasSourceSpecification) => {
    if (!map.value) {
      console.log("MAP NOT EXISTS");
      return;
    }

    if (map.value.getSource(id)) {
      return;
    }

    map.value.addSource(id, source);
  };

  const updateSource = (id: string, data: GeoJSON.GeoJSON) => {
    if (!map.value) {
      console.log("MAP NOT EXISTS");
      return;
    }

    const mapSource = map.value.getSource(id) as maplibregl.GeoJSONSource;

    if (!mapSource) {
      console.log("SORUCE IS NOT EXISTS");
      return;
    }

    mapSource.setData(data);
  };

  const addImage = async (url: string, imageId: string, options?: { width: number; height: number }) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.width = options?.width ?? 200;
      img.height = options?.height ?? 200;
      img.src = url;

      img.onload = () => {
        if (!map.value) {
          console.log("MAP NOT EXISTS");
          return;
        }

        map.value.addImage(imageId, img, {
          pixelRatio: window.devicePixelRatio || 2,
        });

        resolve();
      };

      img.onerror = () => reject();
    });
  };

  const fitBounds = (coords: BoundsArgs[]) => {
    if (!map.value) {
      console.log("MAP NOT EXISTS");
      return;
    }

    const bounds = new maplibregl.LngLatBounds();

    coords.forEach((coord) => {
      bounds.extend(coord);
    });

    return new Promise<void>((resolve) => {
      nextTick(() => {
        map.value?.fitBounds(bounds, {
          padding: 20,
          zoom: 15,
        });
        resolve();
      });
    });
  };

  const init = () => {
    return new Promise<void>((resolve) => {
      if (mapRef.value?.map.isStyleLoaded()) {
        resolve();
      } else {
        mapRef.value?.map.once("load", resolve);
      }
    });
  };

  const map = computed(() => mapRef.value?.map);

  return {
    mapRef,
    addLayer,
    addSource,
    updateSource,
    addImage,
    fitBounds,
    init,
  };
};
