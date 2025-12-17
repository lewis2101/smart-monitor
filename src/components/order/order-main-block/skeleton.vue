<script setup lang="ts">

import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 30%" />
  </base-island-block>
  <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 80%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
  </base-island-block>
  <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 50%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
  </base-island-block>
  <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 30%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
  </base-island-block>
  <base-island-block v-for="item in 5" :key="item" rounded="S" class="order-block-skeleton" :clickable="false">
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 70%" />
    <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 40%" />
  </base-island-block>
  <div class="order-block-skeleton__buttons">
    <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
      <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 100%" />
    </base-island-block>
    <base-island-block rounded="S" class="order-block-skeleton" :clickable="false">
      <ion-skeleton-text class="order-block-skeleton__item" animated style="width: 100%" />
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.order-block-skeleton {
  width: 100%;
  margin-bottom: 8px;

  &__item {
    border-radius: 16px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
