<script setup lang="ts">
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

const props = defineProps<
  {
    list: {
      label: string;
      value: string;
    }[];
  } & BackdropComponentProps<(value: string) => void, (error: Error) => void>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const handleClick = (value: string) => {
  props.onSuccess?.(value);
  emit("closeBackdrop");
};
</script>

<template>
  <div class="pick-backdrop">
    <div v-for="item in list" :key="item.value" class="pick-backdrop__item" @click="handleClick(item.value)">
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.pick-backdrop {
  padding: 0 8px 16px 8px;

  &__item {
    color: $black;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;

    padding: 16px;
    border-radius: 8px;
    border-bottom: 1px solid $gray-light;
  }
}
</style>
