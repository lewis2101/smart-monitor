<script setup lang="ts">
import BlogsList from "@/widgets/blogs-list/blogs-list.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <blogs-list />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
