<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { reactive } from "vue";
import { IonButton } from "@ionic/vue";
import type { AddressInfo } from "@/api/map/types.ts";

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
    title: "Выберите точку на карте",
    props: {
      placeholder: "Адрес отправления",
    },
  });
};

type AddressSelectorType = {
  wp1: string;
  wp2: string;
  lat1: number;
  lat2: number;
  lon1: number;
  lon2: number;
  color: string;
  point1: {
    x: number;
    y: number;
    city: string;
    house: string;
    value: string;
    street: string;
    country: string;
    formatted_path: string;
  };
  point2: {
    x: number;
    y: number;
    city: string;
    house: string;
    value: string;
    street: string;
    country: string;
    formatted_path: string;
  };
  points: number[][];
  status: string;
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  defaultStart: boolean;
};

const addresses = reactive<
  {
    name?: string;
    lat?: number;
    lng?: number;
    point?: AddressInfo;
  }[]
>([]);

const model = defineModel<AddressSelectorType[]>({ required: true, default: () => [] });

model.value.forEach((item) => {
  const wp1 = {
    name: item.wp1,
    lat: item.lat1,
    lng: item.lon2,
    point: item.point1,
  };
  const wp2 = {
    name: item.wp2,
    lat: item.lat2,
    lng: item.lon2,
    point: item.point2,
  };
  addresses.push(wp1);
  addresses.push(wp2);
});
</script>

<template>
  <div class="address-selector">
    <div class="address-selector__content">
      <div class="address-selector__title">{{ $t("address-selector.title") }}</div>
      <template v-for="(item, idx) in addresses" :key="item.lat + item.lng + idx">
        <address-input
          :placeholder="
            idx === 0 ? $t('address-selector.departure') : $t('address-selector.destination', { count: idx })
          "
          :label="item.name"
          class="address-selector__item"
          @open-map="openMapPicker"
        />
      </template>
      <ion-button fill="outline" class="address-selector__button">Добавить</ion-button>
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

  &__button {
    width: 100%;
  }
}
</style>
