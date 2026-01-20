<script setup lang="ts"></script>

<template>
  <div class="default-page">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default-page {
  padding: 16px 24px calc(16px + env(safe-area-inset-bottom)) 24px;
}
</style>
