<script setup lang="ts">
import {IonSpinner} from "@ionic/vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import {computed} from "vue";
import {formatDateString} from "@/utils/formatDate.ts";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    errorText?: string;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    showTime?: boolean;
  }>(),
  {
    clearable: false,
    disabled: false,
    showTime: false,
  },
);

defineEmits<{
  (e: "select-date"): void;
}>()

const model = defineModel<string | string[] | null>();

const handleClear = () => {
  model.value = null;
}

const formattedDate = computed(() => {
  if (model.value) {
    if (Array.isArray(model.value)) {
      return model.value.map((date) => formatDateString(date, {time: props.showTime})).join(" - ");
    }
    return formatDateString(model.value, {time: props.showTime});
  }
  return null;
})
</script>

<template>
  <div ref="dateTimeFieldRef"
       :class="['base-date-picker', disabled && 'disabled']" @click="$emit('select-date')">
    <div
      v-if="placeholder"
      :class="['base-date-picker__placeholder', model && 'base-date-picker__placeholder_focus']"
    >
      {{ placeholder }}
    </div>
    <div v-if="model" class="base-date-picker__value">
      {{ formattedDate }}
    </div>
    <div v-if="loading" class="base-date-picker__spinner">
      <ion-spinner name="circular" class="base-date-picker__spinner-icon"/>
    </div>
    <div v-if="!loading && clearable && model" class="base-date-picker__clear"
         @click.stop="handleClear">
      <base-icon name="close"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-date-picker {
  color: $txt-black;

  min-height: 52px;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid #f2f2f7;
  border-radius: 12px;

  position: relative;

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

  &__value {
    padding: 20px 16px 12px 16px;
  }

  &__spinner {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;

    &-icon {
      color: $main-color;
    }
  }

  &__clear {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.disabled {
  color: #64748b !important;
}
</style>
