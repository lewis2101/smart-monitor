<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import MainReports from "@/components/main/main-reports/main-reports.vue";
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import MainHeader from "@/components/main/main-header/main-header.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<template>
  <ion-page class="main-page">
    <ion-header>
      <base-toolbar>
        <main-header />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="main-page__content" @refresh="handleRefresh">
      <div class="main-page__decor"></div>
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

  &__content {
    --background: linear-gradient(180deg, #041a4b 15%, #ffffff 100%);
  }

  &__decor {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #041a4b 15%, #143b88 30%, #ffffff 100%);
  }

  &__body {
    position: relative;
    z-index: 1;
    padding: 0 8px;
  }
}

.main-docs-block,
.main-menu-block,
.main-reports {
  margin-bottom: 16px;
}
</style>
