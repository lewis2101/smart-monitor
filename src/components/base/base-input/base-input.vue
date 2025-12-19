<script setup lang="ts">
import { useEmits } from "@/composables/useEmits.ts";
import { ref } from "vue";
import { IonInput } from "@ionic/vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

defineProps<{
  placeholder?: string;
  errorText?: string;
  clearable?: boolean;
  disabled?: boolean;
}>();

const model = defineModel<string>();
const { emits } = useEmits();

const baseInputRef = ref<HTMLDivElement | null>(null);

const isFocused = ref(false);

const handleClear = () => {
  model.value = "";
};
</script>

<template>
  <div class="base-input" ref="baseInputRef">
    <div :class="['base-input__wrapper', disabled && 'base-input-disabled']">
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
        :disabled="disabled"
        @ion-focus="isFocused = true"
        @ion-blur="isFocused = false"
      />
      <div v-if="clearable && model" class="base-input__clear" @click.stop="handleClear">
        <base-icon name="close" />
      </div>
    </div>
    <div v-if="errorText" class="base-input__error">{{ errorText }}</div>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  &__wrapper {
    position: relative;
  }

  &-disabled {
    color: $txt-description;
  }

  &:deep(.input-disabled) {
    opacity: 1 !important;
  }

  &__native {
    --padding-start: 16px;
    --padding-end: 16px;
    --padding-top: 20px;
    --padding-bottom: 12px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid #f2f2f7;
    border-radius: 12px;

    &:has(.has-focus) {
      background: red;
    }

    .disabled {
      opacity: 1;
    }
  }

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);

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

  &__clear {
    position: absolute;
    z-index: 2;
    padding: 16px;
    right: 0;
    top: 0;
    margin-top: 0.3rem;
    color: #94a3b8;
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
