<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="learning-score">
    <base-island-block v-for="i in 2" :key="i" class="learning-score__wrapper" :clickable="false">
      <div class="learning-score__item">
        <div class="learning-score__title success">
          <ion-skeleton-text animated />
        </div>
        <div class="learning-score__description">
          <ion-skeleton-text animated />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.learning-score {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;

  &__wrapper {
    padding: 16px;
  }

  &__title {
    margin-bottom: 8px;

    ion-skeleton-text {
      width: 50px;
      height: 32px;
      border-radius: 24px;
    }
  }

  &__description {
    ion-skeleton-text {
      width: 70px;
      height: 16px;
      border-radius: 24px;
    }
  }
}
</style>
