<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { StepField } from "@/components/step-generator/types.ts";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { onMounted, useTemplateRef, watch } from "vue";
import { IonButton, IonSpinner } from "@ionic/vue";
import type { AddressInfo } from "@/api/map/types.ts";
import { useI18n } from "vue-i18n";
import type { AddressSelectorRoute } from "@/composables/order/types.ts";
import maplibregl from "maplibre-gl";
import { useMapPolyline } from "@/composables/map/useMapPolyline.ts";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { type AddressData, useAddresses } from "@/components/step-generator/AddressSelector/use-addresses.ts";

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

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");
const mapContainer = useTemplateRef("mapContainer");

const { init, paintRoute, isReady } = useMapPolyline({
  mapRef: () => mapRef.value?.map ?? null,
});

const model = defineModel<AddressSelectorRoute[]>({ required: true, default: () => [] });
const { addresses, addAddress, createRoutes, isPossibleCreateAddress, isPossibleAddRoute, isLoading } =
  useAddresses(model);

const handleCreateRoutes = async () => {
  const routes = await createRoutes();
  if (routes) {
    model.value = routes;
  }
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

    isPossibleCreateAddress.value = true;
  } catch (error) {
    console.log(error);
  }
};

const openMapRoute = () => {
  if (isPossibleCreateAddress.value) return;

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

watch(model, (value) => {
  if (value) {
    paintRoute(model.value, {
      boundPadding: 20,
    });
    isPossibleCreateAddress.value = false;
  }
});

watch(isReady, (value) => {
  if (value && model.value) {
    paintRoute(model.value, {
      boundPadding: 20,
    });
    isPossibleCreateAddress.value = false;
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
      <ion-button
        v-if="!field.disabled && !disabled && isPossibleAddRoute"
        fill="outline"
        class="address-selector__button"
        @click="addAddress"
      >
        Добавить
      </ion-button>
    </div>
    <div ref="mapContainer" class="address-selector__map-wrapper">
      <base-map
        ref="mapRef"
        :class="['address-selector__map', (isPossibleCreateAddress || isLoading) && 'address-selector__map-disabled']"
        @click="openMapRoute"
      />
      <ion-spinner v-if="isLoading" name="circular" class="address-selector__spinner" />
      <ion-button
        v-if="isPossibleCreateAddress && !isLoading"
        class="address-selector__map-button"
        @click="handleCreateRoutes"
      >
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
