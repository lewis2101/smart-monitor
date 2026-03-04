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

const props = defineProps<{
  orderId: string;
}>();

const router = useIonRouter();
const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");

const { userInfoStorage } = useAuthStorage();

const globalImageStore = useMockOrderStore();
const { images, address, description } = storeToRefs(globalImageStore);

const { init, paintPins, isReady } = useMapPoints({
  mapRef: () => mapRef.value?.map ?? null,
});

const globalBackdropStore = useGlobalBackdropStore();
const globalSpinner = useGlobalSpinner();

const categoryModel = ref("");
const categoryList = [
  {
    label: "Уборка и благоустройства",
    value: "1",
  },
  {
    label: "Электрика",
    value: "2",
  },
  {
    label: "Водоснабжение и канализация",
    value: "3",
  },
  {
    label: "Отопление и вентиляция",
    value: "4",
  },
  {
    label: "Здание и конструкция",
    value: "5",
  },
  {
    label: "Безопасность / Техника / безопасности",
    value: "6",
  },
  {
    label: "Оборудование и инвентарь",
    value: "7",
  },
  {
    label: "Прочее / Административное",
    value: "8",
  },
];

const mustModel = ref("");
const mustList = [
  {
    label: "Отдель охраны труда и техники безопасности (ОТиТБ)",
    value: "1",
  },
  {
    label: "АХО (Административно-хозяйственный отдел)",
    value: "2",
  },
  {
    label: "Строительно-ремонтный участок",
    value: "3",
  },
  {
    label: "Электротехнический отдел",
    value: "4",
  },
  {
    label: "Сантехнический отдел",
    value: "5",
  },
  {
    label: "Отдел эксплуатации зданий / инженерная служба",
    value: "6",
  },
  {
    label: "Служба безопасности / охрана объекта",
    value: "7",
  },
  {
    label: "Администрация / диспетчерская служба",
    value: "8",
  },
];

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
    <base-island-block title="Подробности" class="mock-order__description-wrapper" :clickable="false">
      <div class="mock-order__description">
        {{ description }}
      </div>
    </base-island-block>
    <base-island-block title="Автор заявки" :clickable="false" class="mock-order__contact-wrapper">
      <a href="tel:+77777777777" class="mock-order__contact">
        <div class="mock-order__contact-title">
          <base-icon name="user" />
          {{ userInfoStorage.lastName }} {{ userInfoStorage.firstName }}
        </div>
        <div class="mock-order__contact-call">
          <base-icon name="phone" />
        </div>
      </a>
    </base-island-block>
    <base-island-block title="Выберите адрес" class="mock-order__map-wrapper" :clickable="false">
      <address-input placeholder="Адрес" :label="address.name" :list="[]" disabled />
      <base-map ref="mapRef" class="mock-order__map" @click="handleClickMap" />
    </base-island-block>
    <select-input
      v-model="categoryModel"
      title="Выберите категорию заявки"
      placeholder="Категория заявки"
      :list="categoryList"
      class="mock-order__select-list"
    />
    <select-input
      v-model="mustModel"
      title="Ответственный отдел"
      placeholder="Ответственный отдел"
      :list="mustList"
      class="mock-order__select-list"
    />
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

  &__contact-call {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $secondary-color;
    border-radius: 50%;
    color: $white;

    width: 32px;
    height: 32px;

    span {
      width: 16px;
    }
  }

  &__select-list {
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
