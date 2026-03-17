<script setup lang="ts">
import AuthPublicKeyList from "@/widgets/auth-public-key-list/auth-public-key-list.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <auth-public-key-list />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
