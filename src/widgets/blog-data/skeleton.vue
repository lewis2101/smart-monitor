<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="blog-data">
    <base-island-block class="blog-data__image-wrapper" :clickable="false">
      <ion-skeleton-text class="blog-data__image" animated />
    </base-island-block>
    <base-island-block class="blog-data__content-wrapper" :clickable="false">
      <div class="blog-data__content">
        <ion-skeleton-text
          v-for="i in 20"
          :key="i"
          animated
          :style="{ width: `${Math.round(Math.random() * 170) + 150}px` }"
        />
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.blog-data {
  &__image-wrapper {
    padding: 0;
  }

  &__image {
    width: 100%;
    height: 300px;
    object-fit: cover;

    border-radius: 24px;
  }

  &__content-wrapper {
    margin-top: 8px;
  }

  &__content {
    ion-skeleton-text {
      height: 16px;
      border-radius: 24px;
      margin-bottom: 8px;
    }
  }
}
</style>
