<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="wrapper">
    <base-island-block v-for="i in 4" :key="i" class="item-wrapper" :clickable="false">
      <div class="item">
        <ion-skeleton-text animated class="circle" />
        <div>
          <ion-skeleton-text animated class="title" />
          <ion-skeleton-text animated class="text" />
          <ion-skeleton-text animated class="text" />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.item-wrapper {
  padding: 20px;
}
.item {
  display: flex;
  gap: 8px;
}
.circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.title {
  width: 200px;
  height: 20px;
  margin-bottom: 8px;
  border-radius: 24px;
}
.text {
  width: 150px;
  height: 16px;
  margin-bottom: 8px;
  border-radius: 24px;
}
</style>
