<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DocsLinkedInfoBlock from "@/components/docs/docs-linked-info-block/docs-linked-info-block.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<template>
  <ion-page class="docs-page">
    <ion-header>
      <ion-toolbar class="docs-page__toolbar">
        <default-layout-header title="Ваши документы" />
      </ion-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="handleRefresh">
      <div class="docs-page__body">
        <docs-linked-info-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
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
