<script setup lang="ts">
</script>

<template>
  <li class="base-list-item">
    <slot />
  </li>
</template>

<style scoped lang="scss">
.base-list-item {
  color: $txt-description;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  letter-spacing: 0;
}
</style>
