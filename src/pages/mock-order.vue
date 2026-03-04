<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage, IonButton } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import BaseMap from "@/components/map/base-map.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import BaseTextarea from "@/components/base/base-textarea/base-textarea.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import type { AddressInfo } from "@/api/map/types.ts";
import type { AddressData } from "@/components/step-generator/AddressSelector/use-addresses.ts";
import maplibregl from "maplibre-gl";
import { useMapPoints } from "@/composables/map/useMapPoint.ts";

const orderId = Math.round(Math.random() * 1000) + 500;

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");

const address = ref<AddressData>({
  name: "",
});
const gallery = ref<string[]>([]);
const description = ref("");

const { init, paintPins, isReady } = useMapPoints({
  mapRef: () => mapRef.value?.map ?? null,
});

const globalBackdropStore = useGlobalBackdropStore();

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
</script>

<template>
  <ion-page class="mock-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="`Заявка - ${orderId}`" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <div class="pub-order">
        <base-island-block title="Изображения" :clickable="false">
          <base-gallery-block v-model="gallery" />
        </base-island-block>
        <base-island-block title="Выберите адрес" class="pub-order__map-wrapper" :clickable="false">
          <address-input placeholder="Адрес" :label="address.name" :list="[]" @open-map="handleMapPicker" />
          <base-map ref="mapRef" class="pub-order__map" @click="handleClickMap" />
        </base-island-block>
        <base-textarea v-model="description" class="pub-order__description" placeholder="Подробности" />
        <div class="pub-order__button-wrapper">
          <ion-button class="pub-order__button"> Отправить </ion-button>
          <ion-button fill="outline" color="danger" class="pub-order__button"> Отменить заявку </ion-button>
        </div>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.mock-order-page {
}

.pub-order {
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
