<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DocsLinkedInfoBlock from "@/components/docs/docs-linked-info-block/docs-linked-info-block.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <ion-page class="docs-page">
    <ion-header :translucent="true">
      <base-toolbar>
        <default-layout-header title="Ваши документы" hide-back />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
     <base-island-block :clickable="false">
       <default-page>
         <docs-linked-info-block />
       </default-page>
     </base-island-block>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
