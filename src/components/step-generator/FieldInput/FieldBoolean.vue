<script setup lang="ts">
import ToggleSwitch from "primevue/toggleswitch";
import type {StepField} from "@/components/step-generator/types.ts";
import {watch} from "vue";

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
}>()

const model = defineModel<boolean | null>();

watch(model, () => {
  emit("change");
})
</script>

<template>
  <label :for="field.value" class="field-boolean">
    <div class="field-boolean__title">
      {{ $t(field.value) }}
    </div>
    <toggle-switch v-model="model" :input-id="field.value" :disabled="disabled"
                   class="field-boolean__switch"/>
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

  &__switch {
    --p-toggleswitch-checked-background: #{$main-color};
    --p-toggleswitch-checked-hover-background: #{$main-color};
  }
}
</style>
