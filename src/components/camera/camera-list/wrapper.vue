<script setup lang="ts">
import CameraList from "@/components/camera/camera-list/camera-list.vue";
import Skeleton from "./skeleton.vue";
import type { CameraListProps } from "@/components/camera/camera-list/types.ts";
import TransitionSuspense from "@/components/transition-suspense.vue";

defineProps<CameraListProps>();
</script>

<template>
  <TransitionSuspense>
    <camera-list v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
