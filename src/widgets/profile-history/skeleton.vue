<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block skeleton-title class="profile-history" :clickable="false">
    <div v-for="i in 4" :key="i" class="profile-history__item">
      <div class="profile-history__icon">
        <ion-skeleton-text animated />
      </div>
      <div class="profile-history__content">
        <div v-for="i in 2" :key="i" class="profile-history__text">
          <ion-skeleton-text animated />
        </div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.profile-history {
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 16px;

    padding: 4px;
  }

  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-size: 14px;
    ion-skeleton-text {
      width: 200px;
      height: 14px;
      border-radius: 24px;
      margin-bottom: 4px;
    }

    .bold {
      font-weight: bold;
    }
  }
}
</style>
