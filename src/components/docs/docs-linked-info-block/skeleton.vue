<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block v-for="i in 6" :key="i" :clickable="false" class="wrapper" rounded="S">
    <div class="content">
      <ion-skeleton-text animated class="skeleton-circle" />
      <div>
        <ion-skeleton-text animated class="skeleton-title" />
        <ion-skeleton-text animated class="skeleton-text" />
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 8px;
}
.content {
  display: flex;
  gap: 8px;
}
.skeleton-title {
  width: 150px;
  height: 15px;
  border-radius: 16px;
  margin-bottom: 8px;
  margin-top: 8px;
}
.skeleton-circle {
  width: 30px;
  height: 30px;
  border-radius: 16px;
  margin-bottom: 8px;
}
.skeleton-text {
  width: 60px;
  height: 15px;
  border-radius: 16px;
  margin-bottom: 8px;
}
</style>
