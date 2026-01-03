<script setup lang="ts">
import { IonModal } from "@ionic/vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useTemplateRef } from "vue";

defineProps<{
  title: string;
}>();

const model = defineModel<boolean>({ required: true });
const bottomSheetRef = useTemplateRef("bottomSheetRef");

const closeBackdrop = () => {
  bottomSheetRef.value?.$el.dismiss();
};

defineExpose({
  close: () => closeBackdrop(),
});
</script>

<template>
  <ion-modal
    ref="bottomSheetRef"
    :is-open="model"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    handle
    backdrop-dismiss
    swipe-to-close
    keyboard-attach
    @didDismiss="model = false"
    :expand-to-scroll="true"
    class="sheet-modal base-backdrop"
  >
    <div class="sheet-content">
      <div class="base-backdrop__header">
        <div class="base-backdrop__title">
          {{ title }}
        </div>
        <button class="base-backdrop__close" @click="closeBackdrop">
          <base-icon name="close" />
        </button>
      </div>
      <div class="base-backdrop__body">
        <slot />
      </div>
    </div>
  </ion-modal>
</template>

<style scoped lang="scss">
ion-modal.sheet-modal {
  --height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
ion-modal.sheet-modal::part(content) {
  position: relative;
  display: block;
  contain: content;
}
ion-modal.sheet-modal .sheet-content {
  --padding-top: 16px;
  --padding-bottom: env(safe-area-inset-bottom);
  --padding-start: 16px;
  --padding-end: 16px;

  overflow: auto;
  max-height: 90vh;
}

.base-backdrop {
  &__header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 16px 16px;
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
