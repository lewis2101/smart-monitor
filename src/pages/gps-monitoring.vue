<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import GpsMonitoringSegmentButtons from "@/widgets/gps-monitoring/gps-monitoring-segment-buttons/gps-monitoring-segment-buttons.vue";
import GpsMonitoringSegments from "@/widgets/gps-monitoring/gps-monitoring-segments/gps-monitoring-segments.vue";
import { useMonitoringSegments } from "@/widgets/gps-monitoring/use-monitoring-segments.ts";

const { segmentModel, handleOpenMap } = useMonitoringSegments();
</script>

<template>
  <ion-page class="gps-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="GPS мониторинг" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary" :x-offset="false" disable-refresh>
      <gps-monitoring-segment-buttons v-model="segmentModel" />
      <gps-monitoring-segments @open-map="handleOpenMap" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.gps-page {
}
</style>
