<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="wrapper">
    <ion-skeleton-text animated />
    <ion-skeleton-text animated />
    <ion-skeleton-text animated />
    <ion-skeleton-text animated />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  overflow: auto;
  padding: 4px;
  border-radius: 24px;

  ion-skeleton-text {
    width: 100%;
    height: 24px;
  }
}
</style>
