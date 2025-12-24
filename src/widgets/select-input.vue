<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed } from "vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    selectTitle?: string;
    disabled?: boolean;
    list: Array<{
      label: string;
      value: number;
    }>;
  }>(),
  {
    disabled: false,
  },
);

const globalBackdropStore = useGlobalBackdropStore();
const model = defineModel<number | null>({ required: true });

const currentValueLabel = computed(() => props.list?.find((l) => l.value === model.value)?.label || "");

const handleClick = async () => {
  if (props.disabled) {
    return;
  }

  const value = (await globalBackdropStore.push("select", {
    title: props.selectTitle || props.placeholder || "",
    props: {
      list: props.list,
      initialValue: model.value,
    },
  })) as number;

  model.value = value;
};
</script>

<template>
  <div class="select-input" @click="handleClick">
    <div :class="['select-input__native', disabled && 'select-input-disabled']">
      <div
        v-if="placeholder"
        :class="['select-input__placeholder', currentValueLabel && 'select-input__placeholder_focus']"
      >
        {{ placeholder }}
      </div>
      <div class="select-input__value">
        {{ currentValueLabel }}
      </div>
    </div>
    <base-icon name="chevron" class="select-input__icon" />
  </div>
</template>

<style scoped lang="scss">
.select-input {
  position: relative;
  color: $txt-black;

  &-disabled {
    color: #64748b !important;
  }

  &__native {
    padding: 20px 16px 12px 16px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
  }

  &__placeholder {
    position: relative;
    bottom: 4px;
    color: $txt-description;

    transition: all 0.2s ease;

    &_focus {
      position: absolute;

      font-size: 12px;
      top: 6px;
      left: 16px;
    }
  }

  &__value {
    color: inherit;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%) rotate(90deg);
    color: $txt-description;
  }
}
</style>
