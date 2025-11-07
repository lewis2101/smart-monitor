<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

withDefaults(
  defineProps<{
    title: string;
    close?: boolean;
  }>(),
  {
    close: false,
  },
);

defineEmits<{
  (e: "clickClose"): void;
  (e: "clickBack"): void;
}>();
</script>

<template>
  <div class="default-layout-header">
    <base-icon class="default-layout-header__icon" name="arrow-back" @click="$emit('clickBack')" />
    <div class="default-layout-header__title">{{ title }}</div>
    <base-icon v-if="close" class="default-layout-header__icon" name="close" @click="$emit('clickClose')" />
    <div v-else class="default-layout-header__help">
      <base-icon name="help" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: $white;

  padding: 12px 16px;

  &__icon {
    flex-shrink: 0;
    height: 32px;
  }

  &__title {
    text-align: center;
    flex-grow: 1;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
  }

  &__help {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;

    border-radius: 4px;
    background-color: $gray-light;
  }
}
</style>
