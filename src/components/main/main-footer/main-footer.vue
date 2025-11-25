<script setup lang="ts">
import FooterItem from "./item.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { computed, ref } from "vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";
import { IonTabBar, IonTabButton, useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { useGlobalImageStore } from "@/stores/use-global-image-store/use-global-image-store.ts";

const globalBackdropStore = useGlobalBackdropStore();
const { setImage } = useGlobalImageStore();

const router = useIonRouter();
const route = useRoute();

const currentPathName = computed(() => route.name as MainTabRoutes);
const getActiveClass = (name: MainTabRoutes) => (currentPathName.value.startsWith(name) ? "active animate" : "");

const handleClickCamera = () => {
  globalBackdropStore.push("camera", {
    args: {
      selectPhoto: (photo: string) => {
        if (photo) {
          setImage(photo);
          const id = Math.round(Math.random() * 10000) + 500;
          router.push({ name: OrderRoutes.newOrder, params: { uuid: id } });
        }
      },
    },
  });
};
</script>

<template>
  <ion-tab-bar slot="bottom" class="main-footer">
    <ion-tab-button tab="home" href="/home">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.home)]" title="Главная">
        <base-icon name="home" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="docs" href="/docs">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.docs)]" title="Документы">
        <base-icon name="docs" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="camera" @click="handleClickCamera">
      <footer-item>
        <div class="main-footer__camera-item">
          <base-icon name="camera" class="main-footer__camera-icon" />
        </div>
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="application" href="/application">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.application)]" title="Заявки">
        <base-icon name="application" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
    <ion-tab-button tab="service" href="/service">
      <footer-item :class="['main-footer__item', getActiveClass(MainTabRoutes.service)]" title="Сервисы">
        <base-icon name="service" class="main-footer__icon" />
      </footer-item>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<style lang="scss" scoped>
.main-footer {
  --bottom-inset: calc(4px + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;

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

  &__camera-item {
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
