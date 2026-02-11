<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { KpiScore } from "@/components/kpi/kpi-score";
import { KpiFeats } from "@/components/kpi/kpi-feats";
import { KpiMetrics } from "@/components/kpi/kpi-metrics";
</script>

<template>
  <ion-page class="docs-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="KPI" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <kpi-score />
      <kpi-feats />
      <kpi-metrics />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.docs-page {
}
</style>
