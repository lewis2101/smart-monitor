<script setup lang="ts">
import { IonTextarea } from "@ionic/vue";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    minHeight?: number;
    maxHeight?: number;
    nativePlaceholder?: string;
  }>(),
  {
    disabled: false,
    required: false,
    minHeight: 150,
    maxHeight: 150,
  },
);

const isFocused = ref(false);
const model = defineModel<string | null>({ required: true });
const textAreaMinHeight = computed(() => `${props.minHeight}px`);
const textAreaMaxHeight = computed(() => `${props.maxHeight}px`);
</script>

<template>
  <div :class="['base-textarea', disabled && 'base-textarea-disabled', placeholder && 'placeholder-offset']">
    <div
      v-if="placeholder"
      :class="['base-textarea__placeholder', (isFocused || model) && 'base-textarea__placeholder_focus']"
    >
      {{ placeholder }} <span v-if="required" class="base-textarea__required">*</span>
    </div>
    <ion-textarea
      v-model="model"
      :placeholder="nativePlaceholder"
      :disabled="disabled"
      auto-grow="true"
      label-placement="stacked"
      :class="['base-textarea__textarea', disabled && 'base-textarea-disabled']"
      rows="1"
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

  .placeholder-offset {
    padding-top: 16px;
  }

  &-disabled {
    color: #64748b !important;
  }

  &:deep(.textarea-disabled) {
    opacity: 1 !important;
  }

  &__textarea {
    --p-textarea-focus-border-color: transparent;
    padding: 0 16px;

    min-height: v-bind(textAreaMinHeight);

    &:deep(.native-wrapper) {
      min-height: v-bind(textAreaMinHeight);
      max-height: v-bind(textAreaMaxHeight);
    }

    &:deep(textarea) {
      overflow: auto;
    }

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

  &__required {
    color: $danger;
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
