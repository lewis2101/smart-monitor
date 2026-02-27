<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText, IonButton } from "@ionic/vue";
</script>

<template>
  <base-island-block class="main-news" :clickable="false">
    <template #top-right>
      <div class="main-news__all">
        <ion-skeleton-text animated />
      </div>
    </template>

    <div class="main-news__wrapper">
      <div v-for="i in 2" :key="i" class="main-news__item">
        <div class="main-news__item-header"></div>
        <div class="main-news__item-content">
          <div class="main-news__title">
            <ion-skeleton-text animated />
          </div>
          <div class="main-news__description">
            <ion-skeleton-text animated />
          </div>
        </div>
      </div>
    </div>
    <ion-button class="main-news__button"></ion-button>
  </base-island-block>
</template>

<style scoped lang="scss">
.main-news {
  padding: 20px;

  &__all {
    padding: 4px 12px;
    color: #007a55;
    background: #d0fae5;
    border-radius: 8px;
    align-items: flex-end;

    ion-skeleton-text {
      width: 80px;
      height: 14px;
      border-radius: 16px;
    }
  }

  &__wrapper {
    display: flex;
    gap: 8px;
    overflow: auto;
  }

  &__item {
    width: 100%;
    min-width: 270px;
    margin-top: 16px;
    border-radius: 32px;
    box-shadow: 0 0 24px 0 #00000014;

    &-header {
      width: 100%;
      height: 160px;
      background: #00bc7d;
      border-radius: 32px 32px 0 0;
    }

    &-content {
      padding: 24px;
    }
  }

  &__title {
    margin-bottom: 12px;
    ion-skeleton-text {
      height: 18px;
      width: 200px;
      border-radius: 24px;
    }
  }

  &__description {
    width: 140px;
    height: 14px;
    border-radius: 24px;
  }

  &__button {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
