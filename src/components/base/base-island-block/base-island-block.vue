<script setup lang="ts">
defineProps<{
  title?: string;
}>();

</script>

<template>
  <div class="base-island-block">
    <span v-if="title" class="base-island-block__title">{{ title }}</span>
    <div class="base-island-block__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-island-block {
  padding: 12px;
  border-radius: 24px;
  background: $white;
  box-shadow: 0 8px 16px 0 #00000014;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    padding: 0 4px;
    margin-bottom: 8px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
