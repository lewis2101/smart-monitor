<script setup lang="ts">
import AuthPublicKeyList from "@/widgets/auth-public-key-list/auth-public-key-list.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <auth-public-key-list />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
