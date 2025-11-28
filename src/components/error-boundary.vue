<template>
  <slot v-if="error" name="error" v-bind="{ error, clearError }" />

  <slot v-else />
</template>

<script setup lang="ts">
import { shallowRef, onErrorCaptured } from "vue";

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  error: [error: Error];
}>();

const error = shallowRef<Error | null>(null);

const clearError = () => {
  error.value = null;
};

onErrorCaptured((err) => {
  emit("error", err);

  error.value = err;

  console.error(err);

  return false;
});
</script>

<style scoped lang="scss"></style>
