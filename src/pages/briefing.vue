<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { BriefingScore } from "@/components/briefing/briefing-score";
import { BriefingTabs } from "@/components/briefing/briefing-tabs";
import { BriefingMaterials } from "@/components/briefing/briefing-materials";
</script>

<template>
  <ion-page class="briefing-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Материалы" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <briefing-score />
      <briefing-tabs />
      <briefing-materials />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.briefing-page {
}
</style>
