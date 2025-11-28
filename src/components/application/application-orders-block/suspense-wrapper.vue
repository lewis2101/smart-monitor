<script setup lang="ts">
import ApplicationOrdersBlock from "@/components/application/application-orders-block/application-orders-block.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <suspense>
    <application-orders-block />
    <template #fallback>
      <skeleton />
    </template>
  </suspense>
</template>

<style scoped></style>
