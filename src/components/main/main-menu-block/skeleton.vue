<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block rounded="M" rounded-orient="all" class="wrapper" :clickable="false">
    <div v-for="i in 5" :key="i" class="content">
      <ion-skeleton-text animated class="skeleton-circle" />
      <ion-skeleton-text animated class="skeleton-text" />
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
  gap: 8px;
}
.skeleton-circle {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  margin-bottom: 8px;
  flex-shrink: 0;
}
.skeleton-text {
  width: 70%;
  height: 15px;
  border-radius: 16px;
}
</style>
