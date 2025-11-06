<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <Button class="base-button">
    <slot />
  </Button>
</template>

<style lang="scss" scoped>
.base-button {
  background-color: $main-color;
  width: 100%;
  min-height: 48px;
}
</style>
