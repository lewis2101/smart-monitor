<script setup lang="ts">
import BlogData from "@/widgets/blog-data/blog-data.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";

defineProps<{
  blogId: string;
}>();
</script>

<template>
  <TransitionSuspense>
    <blog-data v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
