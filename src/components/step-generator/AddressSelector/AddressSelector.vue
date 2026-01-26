<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { computed, reactive, type Ref, ref } from "vue";
import { IonButton } from "@ionic/vue";
import type { AddressInfo } from "@/api/map/types.ts";
import { useI18n } from "vue-i18n";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import { useWialonRoutePointQuery, type RawData as RoutePointRawData } from "@/api/map/wialon-route-point.ts";
import { useQuery } from "@tanstack/vue-query";
import { useWialonRouteQuery } from "@/api/map/wialon-route.ts";

type AddressData = {
  name: string;
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

const routePointQueryParams = ref<RoutePointRawData | null>(null);
const currentSessionKey = ref<string>("");
const showCreateRouteButton = ref(true);

const wialonRoutePointQuery = useWialonRoutePointQuery({
  params: routePointQueryParams as Ref<RoutePointRawData>,
});

const wialonRouteQuery = useWialonRouteQuery({
  params: computed(() => ({
    sessionKey: currentSessionKey.value,
  })),
});

const { data: wialonRoutePointData, suspense: wialonRoutePointSuspense } = useQuery({
  ...wialonRoutePointQuery,
  enabled: () => !!routePointQueryParams.value,
});

const { data: wialonRouteData, suspense: wialonRouteSuspense } = useQuery({
  ...wialonRouteQuery,
  enabled: () => !!currentSessionKey.value,
});

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
  addresses.push({
    name: "",
  });
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

const createRoutes = async () => {
  const routes: AddressSelectorRoute[] = [];

  for (const idx in addresses) {
    const firstPoint = addresses[+idx];
    const secondPoint = addresses[+idx + 1];

    if (!firstPoint || !secondPoint) {
      continue;
    }

    const point = {
      lat1: firstPoint.lat,
      lon1: firstPoint.lng,
      wp1: firstPoint.name,
      point1: firstPoint.point,
      lat2: secondPoint.lat,
      lon2: secondPoint.lng,
      wp2: secondPoint.name,
      point2: secondPoint.point,
    };

    routePointQueryParams.value = {
      point,
    };

    await wialonRoutePointSuspense();

    currentSessionKey.value = wialonRoutePointData.value.sessionKey;

    await wialonRouteSuspense();

    routes.push({
      ...point,
      ...wialonRouteData.value,
      color: "green",
    });
  }

  model.value = routes;
};

const openMapRoute = () => {
  if (showCreateRouteButton.value) return;

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
    <div class="address-selector__map-wrapper">
      <base-map
        :class="['address-selector__map', showCreateRouteButton && 'address-selector__map-disabled']"
        @click="openMapRoute"
      />
      <ion-button v-if="showCreateRouteButton" class="address-selector__map-button"> Проложить маршрут </ion-button>
    </div>
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

  &__map-disabled {
    &::before {
      background: #ffffff;
      opacity: 0.6;
    }
  }

  &__map-wrapper {
    position: relative;
  }

  &__map-button {
    position: absolute;
    top: 50%;
    left: 16px;
    right: 16px;
    transform: translateY(-50%);
    z-index: 2;
  }

  &__button {
    width: 100%;
  }
}
</style>
