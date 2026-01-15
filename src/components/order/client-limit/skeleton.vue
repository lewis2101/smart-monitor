<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="skeleton">
    <ion-skeleton-text class="skeleton__title-item" animated />

    <ion-skeleton-text class="skeleton__title-item" animated />
    <div class="skeleton__item">
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 100%" />
    </div>
    <div class="skeleton__item">
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 100%" />
    </div>
    <ion-skeleton-text class="skeleton__title-item" animated />
    <div class="skeleton__item">
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 100%" />
    </div>
    <div class="skeleton__item">
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 100%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title-item {
    align-self: center;
    width: 50%;
    height: 15px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-radius: 16px;
  }
}
</style>
