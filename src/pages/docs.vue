<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { DocsLinkedInfoBlock } from "@/components/docs/docs-linked-info-block";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
</script>

<template>
  <ion-page class="docs-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Ваши документы" hide-back />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <docs-linked-info-block />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
