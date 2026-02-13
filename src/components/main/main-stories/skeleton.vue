<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block class="wrapper" :clickable="false">
    <ion-skeleton-text class="skeleton-title" />
    <div class="content">
      <div v-for="i in 6" :key="i">
        <ion-skeleton-text animated class="skeleton-circle" />
        <ion-skeleton-text animated class="skeleton-text" />
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}
.content {
  display: flex;
  align-items: center;
  overflow: auto;
  gap: 16px;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 8px;
}
.skeleton-text {
  width: 100%;
  height: 15px;
  border-radius: 16px;
}
</style>
