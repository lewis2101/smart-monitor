<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="skeleton">
    <div v-for="item in 5" :key="item" class="skeleton__item">
      <ion-skeleton-text animated class="skeleton__title" style="width: 40%" />
      <ion-skeleton-text animated class="skeleton__title" style="width: 50%" />
      <ion-skeleton-text animated class="skeleton__title" style="width: 30%" />
      <ion-skeleton-text v-for="mess in 8" :key="mess" animated class="skeleton__massage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  &__item {
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    height: 20px;
  }

  &__message {
    height: 15px;
  }
}
</style>
