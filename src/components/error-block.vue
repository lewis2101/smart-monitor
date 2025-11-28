<script setup lang="ts">
import { computed } from "vue";
import { IonButton } from "@ionic/vue";

const props = withDefaults(
  defineProps<{
    error?: Error | string;
  }>(),
  {
    error: "Что-то пошло не так",
  },
);

defineEmits<{
  (e: "refresh"): void;
}>();

const errorText = computed(() => (props.error && props.error instanceof Error ? props.error.message : props.error));
</script>

<template>
  <div class="error-block">
    <span class="error-block__title">{{ errorText }}</span>
    <ion-button @click="$emit('refresh')">Повторить еще раз</ion-button>
  </div>
</template>

<style scoped lang="scss">
.error-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  gap: 16px;

  &__title {
    font-size: 16px;
  }
}
</style>
