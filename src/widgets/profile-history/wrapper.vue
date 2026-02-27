<script setup lang="ts">
import ProfileHistory from "@/widgets/profile-history/profile-history.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <profile-history />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
