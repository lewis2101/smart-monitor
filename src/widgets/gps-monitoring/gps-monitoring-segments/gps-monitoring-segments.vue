<script setup lang="ts">
import { IonSegmentContent, IonSegmentView } from "@ionic/vue";
import BaseMap from "@/components/map/base-map.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <ion-segment-view>
    <ion-segment-content id="map">
      <div class="monitoring-map">
        <base-map class="monitoring-map__map" />
      </div>
    </ion-segment-content>
    <ion-segment-content id="monitoring" class="monitoring-segment segment-padding">
      <base-island-block title="Транспорт" :clickable="false" class="monitoring-segment__block">
        asdfasdf
      </base-island-block>

      <base-island-block title="Группа" :clickable="false" class="monitoring-segment__block">
        Группа - 1
      </base-island-block>
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
  height: calc(100vh - 100px);
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
