<script setup lang="ts">
import { computed } from "vue";
import { IonButton } from "@ionic/vue";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";

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

const { extractError } = useExtractErrorData();

const errorText = computed(() => {
  if (!props.error) {
    return "";
  }

  return extractError(props.error);
});
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
    text-align: center;
  }
}
</style>
