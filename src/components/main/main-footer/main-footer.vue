<script setup lang="ts">
import FooterItem from "./item.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed, onMounted, useTemplateRef } from "vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { IonTabBar, IonTabButton, useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { usePermissions } from "@/composables/login/usePermissions.ts";
import { useHaptics } from "@/composables/native/use-haptics.ts";

// const BPMN_PROCESS_KEY_RESOURCE = "BpmnProcessKey";

const router = useIonRouter();
const route = useRoute();

const globalBackdropStore = useGlobalBackdropStore();
const globalSpinner = useGlobalSpinner();
const { checkPermission } = usePermissions();

const { lightHaptic } = useHaptics();

const currentPathName = computed(() => route.name as MainTabRoutes);
const getActiveClass = (name: MainTabRoutes) => (currentPathName.value.startsWith(name) ? "active animate" : "");

const createRef = useTemplateRef("createRef");

const ORDER_MENU_MAP = {
  mn_mine: "!OrdersMine",
  mn_admin_orders: "AdminOrders",
  mn_orders: "!Orders",
} as const;

type OrderPermissionKey = keyof typeof ORDER_MENU_MAP;
type OrderMenuValue = (typeof ORDER_MENU_MAP)[OrderPermissionKey];

const orderPath = computed<OrderMenuValue | undefined>(() => {
  const permittedKey = (Object.entries(ORDER_MENU_MAP) as [OrderPermissionKey, OrderMenuValue][]).find(([key]) =>
    checkPermission({
      key,
      method: "gui",
    }),
  );

  return `/orders/${permittedKey?.[1]}`;
});

// const resourceDependencyQuery = useResourceDependencyQuery({
//   getUrl: (url) => `${url}/${BPMN_PROCESS_KEY_RESOURCE}`,
// });

// const { data: processList, refetch: getProcessList } = useQuery({
//   ...resourceDependencyQuery,
//   enabled: false,
// });

onMounted(() => {
  useBubbleAnimate(createRef);
});

// const formattedProcessList = computed(() => {
//   if (processList.value) {
//     return processList.value.content.map((list) => ({
//       label: list.value,
//       value: list.code,
//     }));
//   }
//   return [
//     {
//       label: "Заявка на транспорт",
//       value: "KT_TAXI_PROCESS",
//     },
//     {
//       label: "Техническое обслуживание и ремонт (ТОиР)",
//       value: "LENKRAD_PROCESS",
//     },
//     {
//       label: "Поставка товаров/материалов (ТОиР)",
//       value: "PURCHASE_PROCESS",
//     },
//   ];
// });

// const handleClickCreate = async () => {
//   if (!processList.value) {
//     await globalSpinner.execute(() => getProcessList());
//   }
//
//   const processKey = (await globalBackdropStore.push("pick", {
//     title: "Выберите тип заявки",
//     props: {
//       list: formattedProcessList.value,
//     },
//   })) as string;
//   router.push({ name: OrderRoutes.newOrder, params: { processKey } });
// };

const handleClickTab = () => {
  lightHaptic();
};

const handleClickCreate = () => {
  globalBackdropStore.push("process-list", {
    title: "Выберите тип заявки",
    props: {},
  });
};
</script>

<template>
  <ion-tab-bar slot="bottom" class="main-footer">
    <ion-tab-button tab="home" href="/home" @click="handleClickTab">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.home)]" :title="$t('main-tabs.home')">
        <base-icon name="home" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="docs" href="/docs" @click="handleClickTab">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.docs)]" :title="$t('main-tabs.docs')">
        <base-icon name="docs" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="camera" @click="handleClickCreate">
      <footer-item>
        <div ref="createRef" class="main-footer__create-item">
          <base-icon name="plus" class="main-footer__camera-icon" />
        </div>
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="orders" :href="orderPath" @click="handleClickTab">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.orders)]" :title="$t('main-tabs.orders')">
        <base-icon name="application" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="service" href="/service" @click="handleClickTab">
      <footer-item
        :class="['main-footer__item', getActiveClass(MainTabRoutes.service)]"
        :title="$t('main-tabs.services')"
      >
        <base-icon name="service" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<style lang="scss" scoped>
.main-footer {
  position: relative;
  z-index: 10;
  --bottom-inset: calc(4px + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;

  transform: translateZ(1px);

  background: $white;
  border: 1px solid #f2f2f7;
  border-bottom: 0;
  padding: 8px 0 var(--bottom-inset) 0;

  & > * {
    background: $white;
  }

  .main-footer__item {
    color: #625b71;
  }

  .active {
    color: $main-color;
  }

  .animate {
    span {
      animation: bubble 0.3s ease-in-out;
    }
  }

  @keyframes bubble {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }

  &__icon {
    margin-bottom: 12px;
  }

  &__create-item {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: $main-color;
    border-radius: 50%;
  }

  &__camera-icon {
    color: $white;
  }
}
</style>
