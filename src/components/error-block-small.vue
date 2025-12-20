<script setup lang="ts">
import { refresh } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/vue";
import { computed } from "vue";

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

const errorText = computed(() => {
  if (!props.error) {
    return "";
  }
  if (props.error instanceof Error) {
    return props.error.message;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (props.error?.data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return props.error.data?.fullMessage || props.errpr;
  }

  return props.error;
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
