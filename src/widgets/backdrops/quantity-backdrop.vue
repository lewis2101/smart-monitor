<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import { ref } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

const props = defineProps<
  {
    initialValue: number;
  } & BackdropComponentProps<(value: number) => any>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const model = ref(props.initialValue);

const handleSave = () => {
  props.onSuccess?.(model.value);
  emit("closeBackdrop");
};
</script>

<template>
  <div class="quantity-backdrop-wrapper">
    <div class="quantity-backdrop">
      <ion-button class="quantity-backdrop__button" fill="outline" @click="model--">
        <base-icon name="minus" />
      </ion-button>
      <div class="quantity-backdrop__number">{{ model }}</div>
      <ion-button class="quantity-backdrop__button" fill="outline" @click="model++">
        <base-icon name="plus" />
      </ion-button>
    </div>
    <ion-button class="quantity-backdrop-wrapper__button" @click="handleSave">Сохранить</ion-button>
  </div>
</template>

<style scoped lang="scss">
.quantity-backdrop-wrapper {
  padding: 8px 16px;

  &__button {
    margin-top: 16px;
    width: 100%;
  }
}
.quantity-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;

  &__number {
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
    padding: 16px;
    width: 100%;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    width: 100%;
    max-width: 70px;
    font-weight: 600;
  }
}
</style>
