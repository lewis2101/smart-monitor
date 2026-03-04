<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import BaseTextarea from "@/components/base/base-textarea/base-textarea.vue";
import { IonButton, useIonRouter } from "@ionic/vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { onMounted, useTemplateRef, watch } from "vue";
import maplibregl from "maplibre-gl";
import { useMapPoints } from "@/composables/map/useMapPoint.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { AddressInfo } from "@/api/map/types.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { OrderRoutes } from "@/router/router-list.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useMockOrderStore } from "@/stores/use-mock-order-store/use-mock-order-store.ts";
import { storeToRefs } from "pinia";

const props = defineProps<{
  orderId: string;
}>();

const router = useIonRouter();
const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");

const globalImageStore = useMockOrderStore();
const { images, address, description } = storeToRefs(globalImageStore);

const { init, paintPins, isReady } = useMapPoints({
  mapRef: () => mapRef.value?.map ?? null,
});

const globalBackdropStore = useGlobalBackdropStore();
const globalSpinner = useGlobalSpinner();

const handleMapPicker = async () => {
  try {
    const data = (await globalBackdropStore.push("map-pin-picker", {
      title: "Выберите адрес",
      props: {
        placeholder: "Адрес назначения",
      },
    })) as AddressInfo;

    address.value.name = data.formatted_path;
    address.value.lat = data.y;
    address.value.lng = data.x;
    address.value.point = data;
  } catch (error) {
    console.log(error);
  }
};

const handleClickMap = () => {
  globalBackdropStore.push("map", {
    title: "Карта",
    props: {
      points: [address.value],
    },
  });
};

const createOrder = () => {
  globalSpinner.show();
  setTimeout(() => {
    globalSpinner.hide();
    router.replace({
      name: OrderRoutes.successOrder,
      params: { orderId: props.orderId, status: "CREATED" },
      query: { mock: true, nextMockStep: 2 },
    });
  }, 2000);
};

onMounted(() => {
  init();
});

watch(
  [isReady, address],
  ([rd, adr]) => {
    if (rd && adr) {
      paintPins([adr], {
        padding: 20,
        zoom: 15,
      });
    }
  },
  {
    deep: true,
  },
);

await mockDelayPromise();
</script>

<template>
  <div class="mock-order">
    <base-island-block title="Изображения" :clickable="false">
      <base-gallery-block v-model="images" global />
    </base-island-block>
    <base-island-block title="Выберите адрес" class="mock-order__map-wrapper" :clickable="false">
      <address-input placeholder="Адрес" :label="address.name" :list="[]" @open-map="handleMapPicker" disabled />
      <base-map ref="mapRef" class="mock-order__map" @click="handleClickMap" />
    </base-island-block>
    <base-textarea v-model="description" class="mock-order__description" placeholder="Подробности" disabled />
    <div class="mock-order__button-wrapper">
      <ion-button class="mock-order__button" @click="createOrder"> Отправить </ion-button>
      <ion-button fill="outline" color="danger" class="mock-order__button"> Отменить заявку </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mock-order {
  &__map-wrapper {
    margin-top: 16px;
  }

  &__map {
    position: relative;
    width: 100%;
    height: 240px;
    border-radius: 24px;

    &:before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }

  &__description {
    margin-top: 16px;
  }

  &__button-wrapper {
    margin-top: 16px;
  }

  &__button {
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
