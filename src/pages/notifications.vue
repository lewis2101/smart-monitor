<script setup lang="ts">
import { IonPage, IonHeader, useIonRouter } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
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
  <ion-page class="notification-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header
          title="Уведомления"
          back
          close
          @click-back="handleClickClose"
          @click-close="handleClickClose"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page> NOTIF </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
