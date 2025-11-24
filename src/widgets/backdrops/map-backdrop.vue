<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
</script>

<template>
  <div class="map-backdrop">
    <base-map @pointerdown.stop @pointerup.prevent.stop />
  </div>
</template>

<style scoped lang="scss">
.map-backdrop {
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));
}
</style>
