<script setup lang="ts">
import type { CameraListItem } from "@/components/camera/camera-list/types.ts";
import TransitionImg from "@/components/transition-img.vue";
import { ref } from "vue";

defineProps<{
  item: CameraListItem;
}>();

const isLoading = ref(true);
</script>

<template>
  <div class="camera-view-backdrop">
    <transition-img :src="item.thumbnailImage" class="camera-view-backdrop__img" @load="() => (isLoading = false)" />
    <ion-spinner v-if="isLoading" name="circular" class="camera-view-backdrop__spinner" />
  </div>
</template>

<style scoped lang="scss">
.camera-view-backdrop {
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;
  position: relative;

  &__img {
    width: 100%;
    min-height: 400px;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;

    background: black;
  }

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #{$secondary-color};
  }
}
</style>
