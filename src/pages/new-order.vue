<script setup lang="ts">
import { IonHeader, IonPage, IonToolbar, useIonRouter } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseGalleryBlock from "@/components/base/base-gallery-block/base-gallery-block.vue";
import { MainTabRoutes } from "@/router/router-list.ts";

const router = useIonRouter();

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="new-order-page__toolbar">
        <default-layout-header
          title="Новая заявка"
          close
          @click-close="handleClickClose"
          @click-back="handleClickClose"
        />
      </ion-toolbar>
    </ion-header>
    <base-content-with-refresher>
      <div class="new-order-page__body">
        <base-gallery-block title="Фотографии" />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.new-order-page {
  padding-top: env(safe-area-inset-top);

  &__toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
  }

  &__body {
    padding: 16px 24px;
  }
}
</style>
