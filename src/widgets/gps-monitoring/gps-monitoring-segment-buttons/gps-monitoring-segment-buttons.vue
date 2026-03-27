<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
</script>

<template>
  <ion-segment scrollable value="map">
    <ion-segment-button value="map" content-id="map" class="gps-monitoring-segment-button">
      <ion-label>Карта</ion-label>
    </ion-segment-button>
    <ion-segment-button value="monitoring" content-id="monitoring" class="gps-monitoring-segment-button">
      <ion-label>Мониторинг</ion-label>
    </ion-segment-button>
    <ion-segment-button value="tracks" content-id="tracks" class="gps-monitoring-segment-button">
      <ion-label>Треки</ion-label>
    </ion-segment-button>
    <ion-segment-button value="reports" content-id="reports" class="gps-monitoring-segment-button">
      <ion-label>Отчеты</ion-label>
    </ion-segment-button>
    <ion-segment-button value="geozone" content-id="geozone" class="gps-monitoring-segment-button">
      <ion-label>Геозона</ion-label>
    </ion-segment-button>
    <ion-segment-button value="inWork" content-id="inWork" class="gps-monitoring-segment-button">
      <ion-label>В работе</ion-label>
    </ion-segment-button>
    <ion-segment-button value="drivers" content-id="drivers" class="gps-monitoring-segment-button">
      <ion-label>Водители</ion-label>
    </ion-segment-button>
    <ion-segment-button value="settings" content-id="settings" class="gps-monitoring-segment-button">
      <ion-label>Настройки</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<style scoped lang="scss">
.gps-monitoring-segment-button {
  padding: 8px 12px;
  font-weight: 600;
}
</style>
