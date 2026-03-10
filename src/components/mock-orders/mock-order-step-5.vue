<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { IonButton, useIonRouter } from "@ionic/vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import AddressInput from "@/components/step-generator/AddressSelector/AddressInput.vue";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import maplibregl from "maplibre-gl";
import { useMapPoints } from "@/composables/map/useMapPoint.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { OrderRoutes } from "@/router/router-list.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useMockOrderStore } from "@/stores/use-mock-order-store/use-mock-order-store.ts";
import { storeToRefs } from "pinia";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import SelectInput from "@/widgets/select-input/select-input.vue";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  orderId: string;
}>();

const router = useIonRouter();

const mockOrderStore = useMockOrderStore();
const { resultPhoto } = storeToRefs(mockOrderStore);
const toast = useToast();

const globalSpinner = useGlobalSpinner();

const validate = (func: () => { message: string; isValid: boolean }): void => {
  const { message, isValid } = func();
  if (!isValid) {
    toast.add({
      severity: "error",
      summary: "Ошибка валидации",
      detail: message,
      closable: false,
      life: 3000,
    });
    throw new Error("VALIDATE ERROR");
  }
};

const validateGallery = () => {
  validate(() => ({
    message: "Загрузите изображение о выполнении",
    isValid: resultPhoto.value.length > 0,
  }));
};

const createOrder = () => {
  globalSpinner.show();
  setTimeout(() => {
    globalSpinner.hide();

    validateGallery();

    router.replace({
      name: OrderRoutes.successOrder,
      params: { orderId: props.orderId, status: "MOCK_FINISH" },
      query: { mock: true },
    });
  }, 2000);
};

await mockDelayPromise();
</script>

<template>
  <div class="mock-order">
    <base-island-block title="Изображения" :clickable="false">
      <base-gallery-block v-model="resultPhoto" ref="galleryRef" can-add can-delete />
    </base-island-block>
    <div class="mock-order__button-wrapper">
      <ion-button class="mock-order__button" @click="createOrder"> Отправить </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mock-order {
  &__status {
    background: #f0b100;
    color: $white;
    text-align: center;
    padding: 8px 14px;
    border-radius: 24px;
    margin-bottom: 16px;
  }

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
    padding: 0 16px;
  }

  &__description-wrapper {
    margin-top: 16px;
  }

  &__contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 8px 16px;

    color: $black;
    text-decoration: none;
  }

  &__contact-wrapper {
    margin-top: 16px;
  }

  &__contact-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__contact-icon {
    flex-shrink: 0;
  }

  &__contact-description {
    margin-top: 4px;
    font-size: 12px;
    color: #88888a;
  }

  &__contact-call {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gray-light;
    border-radius: 50%;
    color: $secondary-color;

    width: 32px;
    height: 32px;

    span {
      width: 16px;
    }
  }

  &__select-list {
    margin-top: 16px;
  }

  &__date-picker {
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
