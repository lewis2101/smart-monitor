<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed } from "vue";
import type { StepField } from "@/components/step-generator/types.ts";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const props = defineProps<{
  field: StepField;
}>();

const getInitialValue = () => {
  if (props.field.default) {
    return props.field.default;
  }
  return null;
};

const model = defineModel<any>();
model.value = getInitialValue();

const link = computed(() => {
  if (typeof model.value === "object") {
    return `${import.meta.env.VITE_BASE_ORIGIN}/${model.value?.url}`;
  }
  return "";
});

const handleCopy = async () => {
  await navigator.clipboard.writeText(link.value);
  toast.add({
    severity: "info",
    summary: "Ссылка скопирована",
    detail: "Ссылка на заявку сохранен в буфере",
    life: 3000,
    closable: false,
  });
};
</script>

<template>
  <div class="link-generator">
    <base-input :model-value="link" placeholder="Ссылка на заявку" disabled class="link-generator__input" />
    <div class="link-generator__copy-button" @click="handleCopy">
      <base-icon name="copy" class="link-generator__copy-button_icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-generator {
  position: relative;

  &__copy-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 8px;

    &_icon {
      color: $main-color;
    }
  }

  &__input {
    &:deep(.base-input__native) {
      color: $main-color;
      --padding-end: 42px;
    }
  }
}
</style>
