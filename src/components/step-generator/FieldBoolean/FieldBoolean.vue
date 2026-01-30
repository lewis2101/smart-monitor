<script setup lang="ts">
import ToggleSwitch from "primevue/toggleswitch";
import type { StepField } from "@/components/step-generator/types.ts";
import { onMounted, ref, watch } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: "change"): void;
}>();

const model = defineModel<boolean | null>();
const fieldBooleanRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  useBubbleAnimate(fieldBooleanRef, () => props.disabled);
});

watch(model, () => {
  emit("change");
});
</script>

<template>
  <label
    :for="field.value"
    :class="['field-boolean', (disabled || field.disabled) && 'field-boolean-disabled']"
    ref="fieldBooleanRef"
  >
    <div class="field-boolean__title">
      {{ $t(field.value) }} <span v-if="field.required" class="field-boolean__required">*</span>
    </div>
    <toggle-switch
      v-model="model"
      :input-id="field.value"
      :disabled="disabled || field.disabled"
      class="field-boolean__switch"
    />
  </label>
</template>

<style scoped lang="scss">
.field-boolean {
  padding: 12px 16px;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__required {
    color: $danger;
  }

  &__switch {
    --p-toggleswitch-checked-background: #{$main-color};
    --p-toggleswitch-checked-hover-background: #{$main-color};
  }

  &__title {
    color: inherit;
  }

  &-disabled {
    color: #64748b;
  }
}
</style>
