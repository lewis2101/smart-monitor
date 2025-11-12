<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage, useIonRouter } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BriefingMenuBlock from "@/components/briefing/briefing-menu-block/briefing-menu-block.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
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
  <ion-page class="briefing-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Инструктажи и материалы" back @click-close="handleClickClose" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="briefing-page__body">
        <briefing-menu-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.briefing-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px 8px;
  }
}
</style>
