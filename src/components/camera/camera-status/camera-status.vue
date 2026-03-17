<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import type { CameraStatusProps } from "@/components/camera/camera-status/types.ts";

defineProps<CameraStatusProps>();

await mockDelayPromise();
</script>

<template>
  <div class="camera-status">
    <base-island-block v-for="item in list" :key="item.label" class="camera-status__wrapper" :clickable="false">
      <div class="camera-status__item">
        <div :class="['camera-status__title', item.status]">{{ item.count }}</div>
        <div class="camera-status__description">{{ item.label }}</div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.camera-status {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;

  &__wrapper {
    padding: 16px;
  }

  &__item {
    .all {
      color: $main-color;
    }
    .active {
      color: #155dfc;
    }
    .offline {
      color: $danger;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;
    color: #90a1b9;
    font-weight: bold;
  }
}
</style>
