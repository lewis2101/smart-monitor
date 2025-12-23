<script setup lang="ts">
import {IonTextarea } from "@ionic/vue";
import { ref } from "vue";

withDefaults(
  defineProps<{
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    disabled: false,
  },
);

const isFocused = ref(false);
const model = defineModel<string>({ required: true });
</script>

<template>
  <div :class="['base-textarea', disabled && 'base-textarea-disabled']">
    <div
      v-if="placeholder"
      :class="['base-textarea__placeholder', (isFocused || model) && 'base-textarea__placeholder_focus']"
    >
      {{ placeholder }}
    </div>
    <ion-textarea
      v-model="model"
      :disabled="disabled"
      label-placement="stacked"
      :class="['base-textarea__textarea', disabled && 'base-textarea-disabled']"
      @ion-focus="isFocused = true"
      @ion-blur="isFocused = false"
    />
  </div>
</template>

<style scoped lang="scss">
.base-textarea {
  position: relative;

  border: 1px solid $gray-light;
  border-radius: 12px;
  box-shadow: 0 2px 3px 0 #0000001a;
  padding-top: 16px;

  &-disabled {
    color: #64748b !important;
  }

  &:deep(.textarea-disabled) {
    opacity: 1 !important;
  }

  &__textarea {
    --p-textarea-focus-border-color: transparent;
    width: 100%;
    height: 100%;
    min-height: 150px;
    padding: 0 16px;
    margin-bottom: 16px;

    &::placeholder {
      color: $txt-description;
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0;
    }

    &:focus-visible {
      border: 1px solid $gray-light;
    }
  }

  &__placeholder {
    position: absolute;
    top: 16px;
    left: 16px;

    color: inherit;

    transition: all 0.2s ease;
    will-change: transform;

    &_focus {
      font-size: 12px;
      top: 6px;
      left: 16px;
      transform: translate(0, 0);
    }
  }
}
</style>
