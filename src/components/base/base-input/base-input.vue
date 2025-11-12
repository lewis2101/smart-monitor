<script setup lang="ts">
import { IonInput } from "@ionic/vue";
import { useEmits } from "@/composables/useEmits.ts";

defineProps<{
  errorText?: string;
}>();

const model = defineModel<string>({ required: true });
const { emits } = useEmits();
</script>

<template>
  <div class="base-input">
    <ion-input v-model="model" v-bind="$attrs" v-on="emits" class="base-input__native" />
    <div v-if="errorText" class="base-input__error">{{ errorText }}</div>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  &__native {
    --padding-start: 16px;
    --padding-end: 16px;
    --padding-top: 16px;
    --padding-bottom: 16px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
  }

  &__error {
    color: $main-red;
    padding-top: 8px;
    padding-left: 16px;

    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
  }
}
</style>
