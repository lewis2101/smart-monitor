<script setup lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { onMounted, ref, useId } from "vue";
import { mapsMapper, type MapMapperKeys } from "@/utils/mapMapper.ts";

const mapId = useId();

const mapInstance = ref<maplibregl.Map | null>(null);
const currentMapLayer = ref<MapMapperKeys>("2gis");

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
  });
});
</script>

<template>
  <div :id="mapId" class="base-map"></div>
</template>

<style scoped lang="scss">
.base-map {
  width: 100%;
  height: 100%;
}
</style>
