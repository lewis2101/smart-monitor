<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="learning-courses">
    <div class="learning-courses__title">
      <ion-skeleton-text animated />
    </div>
    <base-island-block v-for="i in 4" :key="i" class="learning-courses__wrapper" :clickable="false">
      <div class="learning-courses__item">
        <div class="learning-courses__item-icon">
          <ion-skeleton-text animated />
        </div>
        <div class="learning-courses__content">
          <div class="learning-courses__item-status">
            <div class="learning-courses__status-title">
              <ion-skeleton-text animated />
            </div>
            <div class="learning-courses__status-time">
              <ion-skeleton-text animated />
            </div>
          </div>
          <div class="learning-courses__item-title">
            <ion-skeleton-text animated />
          </div>
          <ion-skeleton-text animated />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.learning-courses {
  &__title {
    margin-top: 32px;
    margin-left: 8px;
    margin-bottom: 16px;

    ion-skeleton-text {
      width: 150px;
      height: 16px;
      border-radius: 24px;
    }
  }

  &__wrapper {
    padding: 20px;
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    width: 100%;
    gap: 16px;

    &-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 16px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-title {
      margin-bottom: 8px;

      ion-skeleton-text {
        width: 150px;
        height: 24px;
        border-radius: 24px;
      }
    }
  }

  &__content {
    width: 100%;

    & > ion-skeleton-text {
      width: 100%;
      height: 36px;
      border-radius: 24px;
    }
  }

  &__item-status {
    width: 100%;
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__status-title {
    font-weight: bold;
    margin-bottom: 8px;

    ion-skeleton-text {
      width: 100px;
      height: 14px;
      border-radius: 24px;
    }
  }

  &__status-time {
    ion-skeleton-text {
      width: 30px;
      height: 14px;
      border-radius: 24px;
    }
  }
}
</style>
