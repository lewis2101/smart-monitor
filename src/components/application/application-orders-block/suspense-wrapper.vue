<script setup lang="ts">
import ApplicationOrdersBlock from "@/components/application/application-orders-block/application-orders-block.vue";
</script>

<template>
  <suspense>
    <application-orders-block />
    <template #fallback> LOADING... </template>
  </suspense>
</template>

<style scoped></style>
