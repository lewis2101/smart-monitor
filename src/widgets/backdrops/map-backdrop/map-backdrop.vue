<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useMapPolyline } from "@/composables/map/useMapPolyline.ts";
import { onMounted, useTemplateRef, watch } from "vue";
import maplibregl from "maplibre-gl";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";

const props = defineProps<{
  initialData?: AddressSelectorRoute[];
}>();

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");

const { init, paintRoute, isReady } = useMapPolyline({
  mapRef: () => mapRef.value?.map ?? null,
});

onMounted(() => {
  init();
});

watch(isReady, (value) => {
  if (value && props.initialData) {
    paintRoute(props.initialData, {
      boundPadding: 100,
    });
  }
});
</script>

<template>
  <div class="map-backdrop">
    <base-map ref="mapRef" @pointerdown.stop @pointerup.prevent.stop />
  </div>
</template>

<style scoped lang="scss">
.map-backdrop {
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));
}
</style>
