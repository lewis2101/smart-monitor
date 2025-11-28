<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

defineProps<{
  title: string;
  icon?: string;
}>();
</script>

<template>
  <div class="base-linked-info">
    <div class="base-linked-info__header">
      <base-icon v-if="icon" class="base-linked-info__icon" :name="icon" />
      <div class="base-linked-info__title">{{ title }}</div>
    </div>
    <base-icon class="base-linked-info__chevron" name="chevron" />
  </div>
</template>

<style scoped lang="scss">
.base-linked-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__icon {
    color: $main-color;
  }

  &__chevron {
    color: $gray-dark;
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
  }
}
</style>
