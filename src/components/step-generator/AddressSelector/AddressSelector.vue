<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const globalBackdropStore = useGlobalBackdropStore();

const openMap = () => {
  globalBackdropStore.push("map", {
    title: "Выберите точку на карте",
    props: {},
  });
};

const model = defineModel<any[]>();
</script>

<template>
  <div class="address-selector">
    <base-map @click="openMap" />
  </div>
</template>

<style scoped lang="scss">
.address-selector {
  position: relative;

  width: 100%;
  height: 160px;
  div {
    border-radius: 12px;
  }
}
</style>
