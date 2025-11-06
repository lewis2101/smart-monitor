<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import MainReports from "@/components/main/main-reports/main-reports.vue";
import { IonPage, IonHeader, IonToolbar, type RefresherCustomEvent } from "@ionic/vue";
import MainLayoutHeader from "@/components/layout/main-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<template>
  <ion-page class="main-page">
    <ion-header>
      <ion-toolbar class="main-page__toolbar">
        <main-layout-header />
      </ion-toolbar>
    </ion-header>
    <base-content-with-refresher class="main-page__content" @refresh="handleRefresh">
      <div class="main-page__body">
        <main-docs-block class="main-docs-block" />
        <main-menu-block class="main-menu-block" />
        <main-reports class="main-reports" />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style lang="scss" scoped>
.main-page {
  padding-top: env(safe-area-inset-top);

  &__toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
  }

  &__content {
    --background: linear-gradient(180deg, #041a4b 22.12%, #143b88 61.06%, #ffffff 100%);
  }

  &__body {
    padding: 0 8px;
  }
}

.main-docs-block,
.main-menu-block,
.main-reports {
  margin-bottom: 16px;
}
</style>
