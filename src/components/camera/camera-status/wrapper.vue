<script setup lang="ts">
import CameraStatus from "@/components/camera/camera-status/camera-status.vue";
import Skeleton from "./skeleton.vue";
import type { CameraStatusProps } from "@/components/camera/camera-status/types.ts";
import TransitionSuspense from "@/components/transition-suspense.vue";

defineProps<CameraStatusProps>();
</script>

<template>
  <TransitionSuspense>
    <camera-status v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
