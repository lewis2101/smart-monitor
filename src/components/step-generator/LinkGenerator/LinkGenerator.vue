<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed, onMounted, ref } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import type { StepField } from "@/components/step-generator/types.ts";

const props = defineProps<{
  field: StepField;
}>();

const copyButtonRef = ref<HTMLDivElement | null>(null);

const link = computed(() => {
  if (typeof props.field.default === "object") {
    return `${import.meta.env.VITE_BASE_ORIGIN}/${props.field.default?.url}`;
  }
  return "";
});

onMounted(() => {
  useBubbleAnimate(copyButtonRef);
});
</script>

<template>
  <div class="link-generator">
    <base-input :model-value="link" placeholder="Ссылка на заявку" disabled class="link-generator__input" />
    <div ref="copyButtonRef" class="link-generator__copy-button">
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
    z-index: 1;
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
