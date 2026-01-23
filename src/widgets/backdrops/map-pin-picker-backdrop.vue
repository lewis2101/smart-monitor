<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { onMounted, reactive, ref, useTemplateRef } from "vue";
import pinUrl from "@/assets/images/pin.png?url";
import { debounce } from "@/utils/debounce.ts";
import { IonSpinner } from "@ionic/vue";

const mapRef = useTemplateRef("mapRef");

const selectedCoords = reactive<{
  lat: number | null;
  lng: number | null;
}>({
  lat: null,
  lng: null,
});
const isLoading = ref(false);
const addressText = ref("");

function animateOffset(map: maplibregl.Map, from: number, to: number, duration = 150) {
  const start = performance.now();

  function frame(now: number) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t * (2 - t); // easeOut

    const y = from + (to - from) * eased;

    map.setLayoutProperty("center-pin-layer", "icon-offset", [0, y]);

    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initCenterPin(map: maplibregl.Map) {
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
}

function loadPinImage(map: maplibregl.Map) {
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
}

onMounted(() => {
  const map = mapRef.value?.map;
  if (!map) return;

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
  });

  const debouncedGetCenter = debounce(() => {
    const { lng, lat } = map.getCenter();
    selectedCoords.lng = lng;
    selectedCoords.lat = lat;
    console.log({ lng, lat });
  }, 300);

  map.on("moveend", () => {
    debouncedGetCenter();
  });
});
</script>

<template>
  <div class="map-picker-backdrop" @pointerdown.stop @pointerup.prevent.stop>
    <base-map ref="mapRef" />
    <div v-if="addressText" class="map-picker-backdrop__address">
      {{ addressText }}
      <ion-spinner v-if="isLoading" name="circular" class="map-picker-backdrop__spinner" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-picker-backdrop {
  position: relative;
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));

  &__address {
    background: #ffffff;
    padding: 16px 48px 16px 16px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    min-height: 55px;
  }

  &__spinner {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: $main-color;
  }
}
</style>
