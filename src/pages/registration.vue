<script setup lang="ts">
import { IonPage, IonHeader, useIonRouter } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";

const router = useIonRouter();

const { setSecondaryColor, initRouteWatch } = useStatusBarColor();
initRouteWatch(() => setSecondaryColor());
</script>

<template>
  <ion-page class="registration-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Авторизация" back @click-back="router.back" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="registration-page__body">REGIS</div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.registration-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px;
  }
}
</style>
