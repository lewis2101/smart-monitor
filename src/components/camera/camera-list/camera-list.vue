<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import type { CameraListItem, CameraListProps } from "@/components/camera/camera-list/types.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import TransitionImg from "@/components/transition-img.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

defineProps<CameraListProps>();

const globalBackdropStore = useGlobalBackdropStore();

const handleClick = (item: CameraListItem) => {
  globalBackdropStore.push("camera-view", {
    title: item.title,
    props: {
      item,
    },
  });
};

await mockDelayPromise();
</script>

<template>
  <base-island-block title="Камеры" class="camera-list" :shadow="false" :clickable="false">
    <base-island-block
      v-for="item in list"
      :key="item.title"
      class="camera-list__item-wrapper"
      @click="handleClick(item)"
    >
      <div class="camera-list__item">
        <div v-if="item.isLive" class="camera-list__item-badge camera-list__item-live">LIVE</div>
        <div v-if="item.isActive" class="camera-list__item-badge camera-list__item-active">Активно</div>
        <div v-else class="camera-list__item-badge camera-list__item-offline">Оффлайн</div>

        <transition-img
          src="https://www.itoki.jp/resources/column/article/office-workspace/assets/img/office-workspace_thumbnail.jpg"
          class="camera-list__item-image"
        />
        <div class="camera-list__item-content">
          <div class="camera-list__item-title">{{ item.title }}</div>
          <div class="camera-list__item-description">{{ item.description }}</div>
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
    z-index: 1;
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
    font-weight: bold;
  }

  &__item-description {
    font-size: 14px;
    color: #90a1b9;
  }
}
</style>
