<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { computed, onMounted, reactive, ref, useTemplateRef } from "vue";
import pinUrl from "@/assets/images/pin.png?url";
import { debounce } from "@/utils/debounce.ts";
import { IonSpinner } from "@ionic/vue";
import { useWialonAddressQuery } from "@/api/map/wialon-address.ts";
import { useQuery } from "@tanstack/vue-query";
import { useOsmAddressQuery } from "@/api/map/osm-address.ts";
import { IonButton } from "@ionic/vue";

const props = defineProps<{
  placeholder?: string;
}>();

const mapRef = useTemplateRef("mapRef");

const selectedCoords = reactive<{
  lat: number | null;
  lng: number | null;
}>({
  lat: null,
  lng: null,
});

const wialonAddressQuery = useWialonAddressQuery({
  params: computed(() => ({
    posList: [[selectedCoords.lat, selectedCoords.lng]],
  })),
});
const osmAddressQuery = useOsmAddressQuery({
  params: computed(() => ({
    posList: [[selectedCoords.lat, selectedCoords.lng]],
  })),
});

const {
  data: osmData,
  isError,
  isPending: osmPending,
} = useQuery({
  ...osmAddressQuery,
  enabled: computed(() => !!selectedCoords.lat && !!selectedCoords.lng),
});
const { data: wialonData, isPending: wialongPending } = useQuery({
  ...wialonAddressQuery,
  enabled: computed(() => !!selectedCoords.lat && !!selectedCoords.lng && isError.value),
});

const addressText = computed(() => {
  if (osmData.value) {
    return osmData.value.find(Boolean)?.formatted_path;
  }

  if (wialonData.value) {
    return wialonData.value.find(Boolean)?.formatted_path;
  }
  return null;
});

const hasSelectedCoords = computed(() => !!selectedCoords.lat && !!selectedCoords.lng);
const isLoading = computed(() => hasSelectedCoords.value && (osmPending.value || wialongPending.value));

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
    <div class="map-picker-backdrop__address">
      <div class="map-picker-backdrop__wrapper">
        <div :class="['map-picker-backdrop__placeholder', addressText && 'map-picker-backdrop__placeholder_focus']">
          {{ placeholder }}
        </div>
        <div v-if="addressText" class="map-picker-backdrop__value">
          {{ addressText }}
        </div>
        <ion-spinner v-if="isLoading" name="circular" class="map-picker-backdrop__spinner" />
      </div>
    </div>
    <transition name="fade">
      <ion-button v-if="addressText" class="map-picker-backdrop__button">{{ $t("common.save") }}</ion-button>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.map-picker-backdrop {
  position: relative;
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));

  &__address {
    background: #ffffff;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    min-height: 56px;
  }

  &__wrapper {
    position: relative;
    padding: 20px 16px 12px 16px;
  }

  &__placeholder {
    position: relative;
    bottom: 4px;
    color: inherit;

    transition: all 0.2s ease;

    padding-right: 24px;

    &_focus {
      position: absolute;

      font-size: 12px;
      top: 6px;
      left: 16px;
    }
  }

  &__value {
    margin-top: 4px;
  }

  &__spinner {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: $main-color;
  }

  &__button {
    position: fixed;
    bottom: calc(8px + env(safe-area-inset-bottom));
    left: 16px;
    right: 16px;
  }
}
</style>
