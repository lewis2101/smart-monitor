<script setup lang="ts">
import BlogData from "@/widgets/blog-data/blog-data.vue";
import Skeleton from "./skeleton.vue";

defineProps<{
  blogId: string;
}>();
</script>

<template>
  <Suspense>
    <blog-data v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
