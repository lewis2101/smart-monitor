<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import LearningLinkedInfoBlock from "@/components/learning/learning-linked-info-block/learning-linked-info-block.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
</script>

<template>
  <ion-page class="learning-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Обучение" variant="secondary" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <default-page>
        <learning-linked-info-block />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.learning-page {
}
</style>
