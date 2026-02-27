<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block class="profile-permission-key" skeleton-title :clickable="false">
    <div v-for="i in 5" :key="i" class="profile-permission-key__item">
      <div class="profile-permission-key__content">
        <div class="profile-permission-key__icon">
          <ion-skeleton-text animated />
        </div>
        <div class="profile-permission-key__body">
          <div class="profile-permission-key__title">
            <ion-skeleton-text animated />
          </div>
          <div class="profile-permission-key__description">
            <ion-skeleton-text animated />
          </div>
        </div>
      </div>
      <div class="profile-permission-key__delete">
        <ion-skeleton-text animated />
      </div>
    </div>
  </base-island-block>
</template>

<style lang="scss" scoped>
.profile-permission-key {
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid $gray-light;
  }

  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__title {
    ion-skeleton-text {
      width: 110px;
      height: 14px;
      border-radius: 24px;
    }
  }

  &__description {
    margin-top: 8px;
    ion-skeleton-text {
      width: 150px;
      height: 14px;
      border-radius: 24px;
    }
  }

  &__delete {
    ion-skeleton-text {
      width: 50px;
      height: 20px;
      border-radius: 24px;
    }
  }
}
</style>
