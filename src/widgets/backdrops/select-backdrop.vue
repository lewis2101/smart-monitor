<script setup lang="ts">
import RadioButton from "primevue/radiobutton";
import { IonButton } from "@ionic/vue";
import { ref } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";

const props = defineProps<
  {
    list: Array<{
      label: string;
      value: string;
    }>;
    initialValue: string;
  } & BackdropComponentProps<(value: string) => any>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const temporaryModel = ref(props.initialValue);

const submit = () => {
  if (temporaryModel.value) {
    props.onSuccess?.(temporaryModel.value);
    emit("closeBackdrop");
  }
};
</script>

<template>
  <div class="select-input-backdrop">
    <label
      v-for="(item, idx) in list"
      :key="item.value"
      :for="`${item.value}-${idx}`"
      class="select-input-backdrop__item"
    >
      <radio-button
        v-model="temporaryModel"
        variant="filled"
        :value="item.value"
        :input-id="`${item.value}-${idx}`"
        class="select-input-backdrop__radio"
      />
      <label :for="`${item.value}-${idx}`">{{ item.label }}</label>
    </label>
    <div class="select-input-backdrop__button-wrapper">
      <ion-button class="select-input-backdrop__button" @click="submit">Подтвердить</ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-input-backdrop {
  padding: 4px;

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 19px 16px;
  }

  &__radio {
    --p-radiobutton-checked-hover-border-color: #{$main-color};
    --p-radiobutton-checked-hover-background: #{$main-color};
    --p-radiobutton-checked-border-color: #{$main-color};
    --p-radiobutton-checked-background: #{$main-color};
  }

  &__button-wrapper {
    padding: 0 20px;
  }

  &__button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
