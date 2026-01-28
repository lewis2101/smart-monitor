<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { onMounted, useTemplateRef } from "vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

type List = {
  label: string;
  description?: string;
  hint?: string[];
  value: number | string;
};

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    selectTitle?: string;
    disabled?: boolean;
    label?: string;
    list: List[];
  }>(),
  {
    disabled: false,
    showSearch: false,
    showReset: false,
  },
);

defineEmits<{
  (e: "open-map"): void;
}>();

const mapRef = useTemplateRef("mapRef");

const globalBackdropStore = useGlobalBackdropStore();

const handleClick = async () => {
  if (props.disabled) {
    return;
  }

  try {
    const value = (await globalBackdropStore.push("select", {
      title: props.selectTitle || props.placeholder || "",
      props: {
        list: props.list,
        searchValue: props.label,
        showSearch: true,
        stretch: true,
        clearable: true,
      },
    })) as number;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  useBubbleAnimate(mapRef);
});
</script>

<template>
  <div class="select-input" @click="handleClick">
    <div :class="['select-input__native', disabled && 'select-input-disabled']">
      <div v-if="placeholder" :class="['select-input__placeholder', label && 'select-input__placeholder_focus']">
        {{ placeholder }}
      </div>
      <div class="select-input__value">
        {{ label }}
      </div>
    </div>
    <div v-if="!disabled" ref="mapRef" class="select-input__map" @click.stop="$emit('open-map')">
      <base-icon name="pin" class="select-input__icon" />
    </div>
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
    padding: 20px 32px 12px 16px;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    white-space: nowrap;
    overflow: hidden;
  }

  &__placeholder {
    position: relative;
    bottom: 4px;
    color: inherit;

    transition: all 0.2s ease;

    padding-right: 24px;

    &_focus {
      position: absolute;

      font-size: 12px;
      top: 6px;
      left: 16px;
    }
  }

  &__value {
    color: inherit;
    padding-right: 24px;
  }

  &__map {
    width: 50px;
    height: 100%;

    background: $gray-light;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 0;
    top: 0;

    border-radius: 0 12px 12px 0;
  }

  &__icon {
    color: $main-color;
  }
}
</style>
