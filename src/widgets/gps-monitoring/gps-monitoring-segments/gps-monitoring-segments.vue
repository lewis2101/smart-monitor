<script setup lang="ts">
import { IonSegmentContent, IonSegmentView } from "@ionic/vue";
import BaseMap from "@/components/map/base-map.vue";
import { MonitoringSegment } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment";
</script>

<template>
  <ion-segment-view>
    <ion-segment-content id="map">
      <div class="monitoring-map">
        <base-map class="monitoring-map__map" />
      </div>
    </ion-segment-content>
    <ion-segment-content id="monitoring" class="monitoring-segment segment-padding">
      <monitoring-segment />
    </ion-segment-content>
    <ion-segment-content id="tracks">tracks</ion-segment-content>
    <ion-segment-content id="reports">reports</ion-segment-content>
    <ion-segment-content id="geozone">geozone</ion-segment-content>
    <ion-segment-content id="inWork">inWork</ion-segment-content>
    <ion-segment-content id="drivers">drivers</ion-segment-content>
    <ion-segment-content id="settings">settings</ion-segment-content>
  </ion-segment-view>
</template>

<style scoped lang="scss">
.monitoring-map {
  width: 100%;
  height: 100%;
}
.segment-padding {
  padding: 16px;
}

.monitoring-segment {
  &__block {
    margin-bottom: 16px;
  }
}
</style>
