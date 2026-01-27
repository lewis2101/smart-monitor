<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { computed, onMounted, reactive, type Ref, ref, useTemplateRef, watch, watchEffect } from "vue";
import { IonButton, IonSpinner } from "@ionic/vue";
import type { AddressInfo } from "@/api/map/types.ts";
import { useI18n } from "vue-i18n";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import { useWialonRoutePointQuery, type RawData as RoutePointRawData } from "@/api/map/wialon-route-point.ts";
import { useQuery } from "@tanstack/vue-query";
import { useWialonRouteQuery } from "@/api/map/wialon-route.ts";
import maplibregl from "maplibre-gl";
import { useMapPolyline } from "@/composables/map/useMapPolyline.ts";
import { useToast } from "primevue/usetoast";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const colors = [
  "#FF5252",
  "#2196F3",
  "#4CAF50",
  "#FB8C00",
  "#050b1f",
  "#4B0082",
  "#800080",
  "#483D8B",
  "#8B0000",
  "#FFD700",
  "#FFFF00",
  "#191970",
  "#2F4F4F",
];

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
const toast = useToast();

const routePointQueryParams = ref<RoutePointRawData | null>(null);
const currentSessionKey = ref<string>("");
const showCreateRouteButton = ref(true);

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");
const mapContainer = useTemplateRef("mapContainer");

const { init, paintRoute, isReady } = useMapPolyline({
  mapRef: () => mapRef.value?.map ?? null,
});

const wialonRoutePointQuery = useWialonRoutePointQuery({
  params: routePointQueryParams as Ref<RoutePointRawData>,
});

const wialonRouteQuery = useWialonRouteQuery({
  params: computed(() => ({
    sessionKey: currentSessionKey.value,
  })),
});

const {
  data: wialonRoutePointData,
  suspense: wialonRoutePointSuspense,
  error: wialonRoutePointError,
  isPending: wialonRoutePointPending,
} = useQuery({
  ...wialonRoutePointQuery,
  enabled: () => !!routePointQueryParams.value,
});

const {
  data: wialonRouteData,
  suspense: wialonRouteSuspense,
  error: wialonRouteError,
  isPending: wialonRoutePending,
} = useQuery({
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
  showCreateRouteButton.value = true;
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
  let colorIdx = 0;

  for (const idx in addresses) {
    const firstPoint = addresses[+idx];
    const secondPoint = addresses[+idx + 1];

    if (!firstPoint || !secondPoint) {
      continue;
    }

    if (
      firstPoint.point &&
      firstPoint.lat &&
      firstPoint.lng &&
      secondPoint.point &&
      secondPoint.lat &&
      secondPoint.lng
    ) {
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

      const routeData = wialonRouteData.value.find(Boolean) as any;

      if (routeData) {
        routes.push({
          ...point,
          ...routeData,
          color: colors[colorIdx++],
        });

        if (colors.length === colorIdx - 1) colorIdx = 0;
      }
    }
  }

  if (routes.length) {
    model.value = routes;
  }
};

const openMapRoute = () => {
  if (showCreateRouteButton.value) return;

  globalBackdropStore.push("map", {
    title: "Маршрут",
    props: {
      initialData: model.value,
    },
  });
};

onMounted(() => {
  init();
  useBubbleAnimate(mapContainer);
});

const isLoading = computed(
  () =>
    (!!routePointQueryParams.value && wialonRoutePointPending.value) ||
    (!!currentSessionKey.value && wialonRoutePending.value),
);

watch(model, (value) => {
  if (value) {
    console.log({ MODEL: model.value });
    paintRoute(model.value, {
      boundPadding: 20,
    });
    showCreateRouteButton.value = false;
  }
});

watch(isReady, (value) => {
  if (value && model.value) {
    paintRoute(model.value, {
      boundPadding: 20,
    });
    showCreateRouteButton.value = false;
  }
});

watchEffect(() => {
  if (wialonRouteError.value || wialonRoutePointError.value) {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Приозошла ошибка при проекладке маршрута",
      life: 3000,
    });
  }
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
          :disabled="field.disabled || disabled"
          class="address-selector__item"
          @open-map="openMapPicker(item, idx)"
        />
      </template>
      <ion-button v-if="!field.disabled && !disabled" fill="outline" class="address-selector__button" @click="handleAdd"
        >Добавить</ion-button
      >
    </div>
    <div ref="mapContainer" class="address-selector__map-wrapper">
      <base-map
        ref="mapRef"
        :class="['address-selector__map', (showCreateRouteButton || isLoading) && 'address-selector__map-disabled']"
        @click="openMapRoute"
      />
      <ion-spinner v-if="isLoading" name="circular" class="address-selector__spinner" />
      <ion-button v-if="showCreateRouteButton && !isLoading" class="address-selector__map-button" @click="createRoutes">
        Проложить маршрут
      </ion-button>
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

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: $main-color;
  }
}
</style>
