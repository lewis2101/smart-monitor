<script setup lang="ts">
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DocsLinkedInfoBlock from "@/components/docs/docs-linked-info-block/docs-linked-info-block.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<template>
  <ion-page class="docs-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Ваши документы" />
      </base-toolbar>
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

  &__body {
    padding: 16px 24px;
  }
}
</style>
