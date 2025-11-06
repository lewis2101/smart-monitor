<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="footer-item">
    <slot />
    <span v-if="title" class="footer-item__title">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-weight: 400;
    font-size: 10px;
    line-height: 100%;
    letter-spacing: 0;
  }
}
</style>
