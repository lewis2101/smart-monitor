<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { ref } from "vue";

defineProps<{
  field: StepField;
}>();

const globalBackdropStore = useGlobalBackdropStore();

const openMap = () => {
  globalBackdropStore.push("map", {
    title: "Маршрут",
    props: {},
  });
};

const openMapPicker = () => {
  globalBackdropStore.push("map-pin-picker", {
    title: "Адрес отправления",
    props: {},
  });
};

const model = defineModel<any[]>();

const asd = ref("");
</script>

<template>
  <div class="address-selector">
    <div class="address-selector__content">
      <div class="address-selector__title">Создание маршрута</div>
      <address-input
        class="address-selector__item"
        placeholder="Адрес отправления"
        :list="[]"
        v-model="asd"
        @open-map="openMapPicker"
      />
    </div>
    <base-map @click="openMap" class="address-selector__map" />
  </div>
</template>

<style scoped lang="scss">
.address-selector {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;

  &__title {
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px #f2f2f7 solid;
  }

  &__content {
    padding: 16px;
  }

  &__item {
    margin-bottom: 8px;
  }

  &__map {
    border-radius: 12px;
    width: 100%;
    height: 240px;

    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }
}
</style>
