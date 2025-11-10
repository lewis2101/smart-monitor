<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage, type RefresherCustomEvent } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BriefingMenuBlock from "@/components/briefing/briefing-menu-block.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<template>
  <ion-page class="briefing-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Инструктажи и материалы" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="handleRefresh">
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
