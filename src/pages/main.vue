<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import MainReports from "@/components/main/main-reports/main-reports.vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  type RefresherCustomEvent,
} from "@ionic/vue";
import MainLayoutHeader from "@/components/layout/main-layout-header.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 5000);
};
</script>

<template>
  <ion-page class="main-page">
    <ion-header>
      <ion-toolbar class="main-page__toolbar">
        <main-layout-header />
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-page__content">
      <ion-refresher slot="fixed" @ion-refresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="main-page__body">
        <main-docs-block class="main-docs-block" />
        <main-menu-block class="main-menu-block" />
        <main-reports class="main-reports" />
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.main-page {
  padding-top: env(safe-area-inset-top);

  &__toolbar {
    padding-top: 0;
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
