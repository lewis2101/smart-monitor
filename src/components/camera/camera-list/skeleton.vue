<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <base-island-block skeleton-title class="camera-list" :shadow="false" :clickable="false">
    <base-island-block v-for="i in 3" :key="i" class="camera-list__item-wrapper">
      <div class="camera-list__item">
        <ion-skeleton-text animated class="camera-list__item-image" />
        <div class="camera-list__item-content">
          <div class="camera-list__item-title">
            <ion-skeleton-text animated />
          </div>
          <div class="camera-list__item-description">
            <ion-skeleton-text animated />
          </div>
        </div>
      </div>
    </base-island-block>
  </base-island-block>
</template>

<style scoped lang="scss">
.camera-list {
  padding: 0;

  &__item {
    position: relative;
  }

  &__item-badge {
    position: absolute;
    font-size: 12px;

    padding: 4px 12px;
    border-radius: 16px;
  }

  &__item-live {
    top: 16px;
    left: 16px;

    background: $danger;
    color: $white;
  }

  &__item-active {
    top: 16px;
    right: 16px;

    background: $secondary-color;
    color: $white;
  }

  &__item-offline {
    top: 16px;
    right: 16px;

    background: $gray-light;
    color: $black;
  }

  &__item-image {
    width: 100%;
    height: 200px;
    border-radius: 24px;
    object-fit: cover;
  }

  &__item-content {
    padding: 8px;
  }

  &__item-title {
    ion-skeleton-text {
      width: 150px;
      height: 16px;
      border-radius: 16px;
    }
  }

  &__item-description {
    margin-top: 8px;
    ion-skeleton-text {
      width: 200px;
      height: 14px;
      border-radius: 16px;
    }
  }
}
</style>
