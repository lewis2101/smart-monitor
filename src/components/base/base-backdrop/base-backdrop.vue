<script setup lang="ts">
import BottomSheet from "@douxcode/vue-spring-bottom-sheet";
import "@douxcode/vue-spring-bottom-sheet/dist/style.css";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useTemplateRef, watch } from "vue";

defineProps<{
  title: string;
}>();

const model = defineModel<boolean>({ required: true });

const bottomSheetRef = useTemplateRef("bottomSheetRef");

defineExpose({
  close: () => bottomSheetRef.value?.close(),
});

watch(model, (value) => {
  if (!value) {
    bottomSheetRef.value?.close();
  }
});
</script>

<template>
  <bottom-sheet v-model="model" ref="bottomSheetRef" class="base-backdrop" :expand-on-content-drag="false">
    <template #header>
      <div class="base-backdrop__header">
        <div class="base-backdrop__title">
          {{ title }}
        </div>
        <button class="base-backdrop__close" @click="bottomSheetRef?.close">
          <base-icon name="close" />
        </button>
      </div>
    </template>
    <template #default>
      <div class="base-backdrop__body">
        <slot />
      </div>
    </template>
  </bottom-sheet>
</template>

<style scoped lang="scss">
.base-backdrop {
  &__header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    color: $black;
  }

  &__close {
    background: transparent;
    border: none;
    outline: none;
    padding: 4px;
    color: $black;
  }

  &__body {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
