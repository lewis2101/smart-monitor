<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block class="blog-item" v-for="i in 4" :key="i" :clickable="false">
    <ion-skeleton-text animated class="blog-item__image" />
    <div class="blog-item__content-wrapper">
      <div class="blog-item__title">
        <ion-skeleton-text animated />
      </div>
      <div class="blog-item__description">
        <ion-skeleton-text animated />
      </div>
      <div class="blog-item__footer">
        <div class="blog-item__time"><ion-skeleton-text animated /></div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.blog-item {
  padding: 0;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &__image {
    width: 100%;
    height: 160px;
    border-radius: 24px 24px 0 0;
  }

  &__content-wrapper {
    padding: 8px 16px 16px 16px;
  }

  &__title {
    margin-bottom: 8px;

    ion-skeleton-text {
      height: 16px;
      width: 170px;
      border-radius: 24px;
    }
  }

  &__description {
    ion-skeleton-text {
      height: 16px;
      width: 100%;
      border-radius: 24px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 8px;

    ion-skeleton-text {
      width: 100px;
      height: 12px;
      border-radius: 24px;
    }
  }
}
</style>
