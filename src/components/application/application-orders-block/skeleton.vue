<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <base-island-block v-for="item in 5" :key="item" rounded="S" class="order-block-skeleton">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 80%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 50%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 20%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
  </base-island-block>
</template>

<style scoped lang="scss">
.order-block-skeleton {
  margin-bottom: 8px;

  &__item {
    border-radius: 16px;
  }
}
</style>
