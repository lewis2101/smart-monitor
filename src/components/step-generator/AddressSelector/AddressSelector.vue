<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { reactive } from "vue";
import { IonButton } from "@ionic/vue";
import type { AddressInfo } from "@/api/map/types.ts";
import { useI18n } from "vue-i18n";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";

type AddressData = {
  name?: string;
  lat?: number;
  lng?: number;
  point?: AddressInfo;
};

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const globalBackdropStore = useGlobalBackdropStore();
const { t } = useI18n();

const model = defineModel<AddressSelectorRoute[]>({ required: true, default: () => [] });
const addresses = reactive<AddressData[]>([]);

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

const handleAdd = () => {
  addresses.push({});
};

const openMapPicker = async (address: AddressData, idx: number) => {
  if (props.disabled || props.field.disabled) {
    return;
  }

  try {
    const data = (await globalBackdropStore.push("map-pin-picker", {
      title: t("address-pin-backdrop.title"),
      props: {
        placeholder: idx === 0 ? t("address-selector.departure") : t("address-selector.destination", { count: idx }),
      },
    })) as AddressInfo;

    address.name = data.formatted_path;
    address.lat = data.y;
    address.lng = data.x;
    address.point = data;
  } catch (error) {
    console.log(error);
  }
};

const openMapRoute = () => {
  globalBackdropStore.push("map", {
    title: "Маршрут",
    props: {},
  });
};
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
          @open-map="openMapPicker(item, idx)"
        />
      </template>
      <ion-button v-if="!field.disabled && !disabled" fill="outline" class="address-selector__button" @click="handleAdd"
        >Добавить</ion-button
      >
    </div>
    <base-map @click="openMapRoute" class="address-selector__map" />
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
