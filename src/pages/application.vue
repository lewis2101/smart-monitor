<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import ApplicationMenuBlock from "@/components/application/application-menu-block/application-menu-block.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
</script>

<template>
  <ion-page class="application-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Мои заявки" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="application-page__body">
        <application-menu-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px 8px;
  }
}
</style>
