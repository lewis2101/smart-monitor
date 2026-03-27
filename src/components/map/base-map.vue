<script setup lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { onMounted, ref, useId } from "vue";
import { mapsMapper, type MapMapperKeys } from "@/utils/mapMapper.ts";

const mapId = useId();

const mapInstance = ref<maplibregl.Map | null>(null);
const currentMapLayer = ref<MapMapperKeys>("2gis");

const isLoading = ref(true);

onMounted(() => {
  mapInstance.value = new maplibregl.Map({
    container: mapId,
    style: {
      version: 8,
      sources: {
        "custom-tile-layer": {
          type: "raster",
          tiles: [mapsMapper[currentMapLayer.value].link],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "custom-layer",
          type: "raster",
          source: "custom-tile-layer",
        },
      ],
    },
    center: [76.8512, 43.222],
    zoom: 12,
    attributionControl: false,
  });

  mapInstance?.value.on("idle", function () {
    mapInstance.value?.resize();
    isLoading.value = false;
  });
});

defineExpose({ map: mapInstance });
</script>

<template>
  <div :id="mapId" class="base-map">
    <Transition name="fade">
      <div v-if="isLoading" class="base-map__spinner-wrapper">
        <ion-spinner name="circular" class="base-map__spinner" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.base-map {
  width: 100%;
  height: 100%;
  position: relative;

  &__spinner-wrapper {
    background: $white;
    position: absolute;
    z-index: 1;
    inset: 0;
  }

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
