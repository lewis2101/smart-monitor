<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useMapPolyline } from "@/composables/map/useMapPolyline.ts";
import { onMounted, useTemplateRef, watch } from "vue";
import maplibregl from "maplibre-gl";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import type { AddressData } from "@/components/step-generator/AddressSelector/use-addresses.ts";
import { useMapPoints } from "@/composables/map/useMapPoint.ts";

const props = defineProps<{
  routes?: AddressSelectorRoute[];
  points?: AddressData[];
}>();

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");

const {
  init: initPolyline,
  paintRoute,
  isReady: isReadyPolyline,
} = useMapPolyline({
  mapRef: () => mapRef.value?.map ?? null,
});

const {
  init: initPoints,
  paintPins,
  isReady: isReadyPoints,
} = useMapPoints({
  mapRef: () => mapRef.value?.map ?? null,
});

onMounted(() => {
  initPolyline();
  initPoints();
});

watch(isReadyPolyline, (value) => {
  if (value && props.routes) {
    paintRoute(props.routes, {
      padding: 20,
      zoom: 15,
    });
  }
});

watch(isReadyPoints, (value) => {
  if (value && props.points) {
    paintPins(props.points, {
      padding: 20,
      zoom: 15,
    });
  }
});
</script>

<template>
  <div class="map-backdrop">
    <base-map ref="mapRef" @pointerdown.stop @pointerup.prevent.stop @touchend.stop @touchmove.stop />
  </div>
</template>

<style scoped lang="scss">
.map-backdrop {
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));
}
</style>
