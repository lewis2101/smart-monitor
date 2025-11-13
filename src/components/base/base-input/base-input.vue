<script setup lang="ts">
import { useEmits } from "@/composables/useEmits.ts";
import { ref } from "vue";
import { IonInput } from "@ionic/vue";

defineProps<{
  placeholder?: string;
  errorText?: string;
}>();

const model = defineModel<string>({ required: true });
const { emits } = useEmits();

const isFocused = ref(false);
</script>

<template>
  <div class="base-input">
    <div
      v-if="placeholder"
      :class="['base-input__placeholder', (isFocused || model) && 'base-input__placeholder_focus']"
    >
      {{ placeholder }}
    </div>
    <ion-input
      v-model="model"
      v-bind="$attrs"
      v-on="emits"
      class="base-input__native"
      @ion-focus="isFocused = true"
      @ion-blur="isFocused = false"
    />
    <div v-if="errorText" class="base-input__error">{{ errorText }}</div>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  position: relative;

  &__native {
    --padding-start: 16px;
    --padding-end: 16px;
    --padding-top: 20px;
    --padding-bottom: 12px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    &:has(.has-focus) {
      background: red;
    }
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);

    color: $txt-description;

    transition: all 0.2s ease;

    &_focus {
      font-size: 12px;
      top: 6px;
      left: 16px;
      transform: translate(0, 0);
    }
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
