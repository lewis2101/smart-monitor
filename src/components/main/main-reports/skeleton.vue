<script setup lang="ts">
import BaseLiquidBlock from "@/components/base/base-liquid-block/base-liquid-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-liquid-block class="wrapper">
    <ion-skeleton-text class="skeleton-title" />
    <div class="content">
      <div v-for="i in 4" :key="i">
        <ion-skeleton-text animated class="skeleton-circle" />
        <ion-skeleton-text animated class="skeleton-text" />
      </div>
    </div>
  </base-liquid-block>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  width: 100%;
}
.skeleton-title {
  width: 150px;
  height: 15px;
  border-radius: 16px;
  margin-bottom: 16px;
  margin-left: 8px;
}
.skeleton-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 8px;
}
.skeleton-text {
  width: 50px;
  height: 15px;
  border-radius: 16px;
}
</style>
