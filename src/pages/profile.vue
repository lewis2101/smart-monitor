<script setup lang="ts">
import { IonHeader, IonPage, useIonRouter } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import ProfileData from "@/components/profile/profile-data.vue";

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
  <ion-page class="profile-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Профиль" back @click-back="handleClickClose" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page>
        <profile-data />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  &__body {
    padding: 16px 8px;
  }
}
</style>
