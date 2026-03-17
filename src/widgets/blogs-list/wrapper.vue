<script setup lang="ts">
import BlogsList from "@/widgets/blogs-list/blogs-list.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <blogs-list />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style lang="scss" scoped></style>
