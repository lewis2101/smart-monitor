<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block :clickable="false">
    <div class="ai-assistant__wrapper">
      <div class="ai-assistant__icon">
        <ion-skeleton-text animated />
      </div>
      <div class="ai-assistant__title">
        <ion-skeleton-text animated />
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.ai-assistant {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: $white;
  }

  &__title {
    ion-skeleton-text {
      width: 150px;
      height: 20px;
      border-radius: 24px;
    }
  }
}
</style>
