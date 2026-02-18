<script setup lang="ts">
import { IonModal, IonContent } from "@ionic/vue";
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
    :initial-breakpoint="0.8"
    :breakpoints="[0, 0.8]"
    handle
    backdrop-dismiss
    swipe-to-close
    keyboard-close
    keep-contents-mounted
    @didDismiss="model = false"
    :expand-to-scroll="false"
    class="base-backdrop"
  >
    <ion-content>
      <div class="base-backdrop__content">
<!--        <div class="base-backdrop__handler">-->
<!--          <div class="base-backdrop__handler-button" />-->
<!--        </div>-->
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
    </ion-content>
  </ion-modal>
</template>

<style scoped lang="scss">
.base-backdrop {
  ion-content::part(scroll) {
    padding-top: 53px;
  }

  //&::part(handle) {
  //  width: 100%;
  //  height: 60px;
  //  top: 0;
  //  opacity: 0;
  //}

  &__content {
    position: relative;
  }

  //&__handler {
  //  position: fixed;
  //  top: 0;
  //  z-index: 13;
  //
  //  width: 100%;
  //  height: 16px;
  //  background: $white;
  //  border-radius: 10px 10px 0 0;
  //
  //  display: flex;
  //  align-items: center;
  //  justify-content: center;
  //}
  //
  //&__handler-button {
  //  width: 36px;
  //  height: 5px;
  //  background: $gray-dark;
  //  border-radius: 24px;
  //}

  &__header {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 16px 16px;

    background: $white;
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
    position: relative;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
