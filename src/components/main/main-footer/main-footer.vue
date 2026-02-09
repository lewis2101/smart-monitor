<script setup lang="ts">
import FooterItem from "./item.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed, onMounted, useTemplateRef } from "vue";
import { MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";
import { IonTabBar, IonTabButton, useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { useResourceDependencyQuery } from "@/api/dependency/resource-dependency.ts";
import { useQuery } from "@tanstack/vue-query";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const BPMN_PROCESS_KEY_RESOURCE = "BpmnProcessKey";

const router = useIonRouter();
const route = useRoute();

const globalBackdropStore = useGlobalBackdropStore();
const globalSpinner = useGlobalSpinner();

const currentPathName = computed(() => route.name as MainTabRoutes);
const getActiveClass = (name: MainTabRoutes) => (currentPathName.value.startsWith(name) ? "active animate" : "");

const createRef = useTemplateRef("createRef");

const resourceDependencyQuery = useResourceDependencyQuery({
  getUrl: (url) => `${url}/${BPMN_PROCESS_KEY_RESOURCE}`,
});

const { data: processList, refetch: getProcessList } = useQuery({
  ...resourceDependencyQuery,
  enabled: false,
});

onMounted(() => {
  useBubbleAnimate(createRef);
});

const formattedProcessList = computed(() => {
  if (processList.value) {
    return processList.value.content.map((list) => ({
      label: list.value,
      value: list.code,
    }));
  }
  return [
    {
      label: "Заявка на транспорт",
      value: "KT_TAXI_PROCESS",
    },
    {
      label: "Техническое обслуживание и ремонт (ТОиР)",
      value: "LENKRAD_PROCESS",
    },
    {
      label: "Поставка товаров/материалов (ТОиР)",
      value: "PURCHASE_PROCESS",
    },
  ];
});

const handleClickCreate = async () => {
  if (!processList.value) {
    await globalSpinner.execute(() => getProcessList());
  }

  const processKey = (await globalBackdropStore.push("pick", {
    title: "Выберите тип заявки",
    props: {
      list: formattedProcessList.value,
    },
  })) as string;
  router.push({ name: OrderRoutes.newOrder, params: { processKey } });
};
</script>

<template>
  <ion-tab-bar slot="bottom" class="main-footer">
    <div class="main-footer__wrapper">
      <ion-tab-button tab="home" href="/home">
        <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.home)]" :title="$t('main-tabs.home')">
          <base-icon name="home" class="main-footer__icon" />
        </footer-item>
      </ion-tab-button>
      <ion-tab-button tab="docs" href="/docs">
        <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.docs)]" :title="$t('main-tabs.docs')">
          <base-icon name="docs" class="main-footer__icon" />
        </footer-item>
      </ion-tab-button>
      <ion-tab-button tab="camera" @click="handleClickCreate">
        <footer-item class="main-footer__middle-item">
          <div ref="createRef" class="main-footer__create-item">
            <base-icon name="plus" class="main-footer__camera-icon" />
          </div>
        </footer-item>
      </ion-tab-button>
      <ion-tab-button tab="orders" href="/orders/!OrdersMine">
        <footer-item
          :class="['main-footer__item', getActiveClass(MainTabRoutes.orders)]"
          :title="$t('main-tabs.orders')"
        >
          <base-icon name="application" class="main-footer__icon" />
        </footer-item>
      </ion-tab-button>
      <ion-tab-button tab="service" href="/service">
        <footer-item
          :class="['main-footer__item', getActiveClass(MainTabRoutes.service)]"
          :title="$t('main-tabs.services')"
        >
          <base-icon name="service" class="main-footer__icon" />
        </footer-item>
      </ion-tab-button>
    </div>
  </ion-tab-bar>
</template>

<style lang="scss" scoped>
.main-footer {
  --background: transparent;

  position: relative;
  bottom: 0;
  z-index: 10;
  --bottom-inset: env(safe-area-inset-bottom);
  display: flex;
  justify-content: space-between;
  border: none;

  border-bottom: 0;
  padding: 0 16px var(--bottom-inset) 16px;

  height: 70px;

  & > * {
    background: transparent;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    background: #fffc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #f2f2f7;
    backdrop-filter: blur(10px);

    height: 70px;

    border-radius: 24px;
  }

  &__middle-item {
    position: relative;
    bottom: 4px;
  }

  .main-footer__item {
    color: #625b71;
  }

  .active {
    color: $main-color;

    .main-footer__icon {
      transition: 0.2s ease-in-out;
      background: $opacity-main;
      color: $white;
    }
  }

  .animate {
    span {
      animation: bubble 0.4s ease-in;
    }
  }

  @keyframes bubble {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &__icon {
    margin-bottom: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;

    color: $main-color;
  }

  &__create-item {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: $secondary-color;
    border-radius: 50%;
    border: 1px $white solid;

    box-shadow: 0 0 12px 0 $secondary-color;
  }

  &__camera-icon {
    color: $white;
  }
}
</style>
