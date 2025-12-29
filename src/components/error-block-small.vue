<script setup lang="ts">
import { refresh } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/vue";
import { computed } from "vue";
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
  <div class="error-block-small">
    <div class="error-block-small__title">{{ errorText }}</div>
    <ion-button class="error-block-small__button" @click="$emit('refresh')">
      <ion-icon slot="icon-only" :icon="refresh" />
    </ion-button>
  </div>
</template>

<style scoped lang="scss">
.error-block-small {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;

  &__title {
    text-align: center;
  }

  &__button {
  }
}
</style>
