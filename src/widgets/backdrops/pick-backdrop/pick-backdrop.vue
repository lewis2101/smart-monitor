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
  padding: 0 8px calc(16px + env(safe-area-inset-bottom)) 8px;

  &__item {
    color: $black;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;

    padding: 16px 12px;
    border-radius: 16px;
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid #f2f2f7;

    text-align: center;

    margin-top: 8px;



  }
}
</style>
