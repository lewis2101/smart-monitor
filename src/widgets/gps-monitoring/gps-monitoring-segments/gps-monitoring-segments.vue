<script setup lang="ts">
import { IonSegmentContent, IonSegmentView } from "@ionic/vue";
import BaseMap from "@/components/map/base-map.vue";
import { MonitoringSegment } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment";
import { onMounted } from "vue";
import carUrl from "@/assets/images/car-grey.png?url";
import { useMap } from "@/composables/map/useMap.ts";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { buildVehicleSource, CARS_SOURCE_KEY, getEmptySource } from "@/composables/map/sources.ts";
import { getVehicleLayer } from "@/composables/map/layers.ts";
import { CARS_ICON_KEY } from "@/composables/map/images.ts";

const emit = defineEmits<{
  (e: "open-map"): void;
}>();

const { mapRef, init, addImage, addSource, addLayer, updateSource, fitBounds } = useMap();

const getFilteredItemsWithCoordinated = (items: VehicleItem[]) =>
  items.filter((item) => !!item.mess.longitude && !!item.mess.latitude && !!item.mess.angle);

const getCoordinatedFromVehicles = (items: VehicleItem[]) =>
  items.map((item) => ({
    lon: item.mess.longitude,
    lat: item.mess.latitude,
  }));

const onRenderCars = (items: VehicleItem[]) => {
  const filteredItems = getFilteredItemsWithCoordinated(items);
  updateSource(CARS_SOURCE_KEY, buildVehicleSource(filteredItems));
};

const fitBoundsItems = async (items: VehicleItem[]) => {
  const filteredItems = getFilteredItemsWithCoordinated(items);

  emit("open-map");

  await fitBounds(getCoordinatedFromVehicles(filteredItems), {
    padding: 20,
    zoom: 13,
  });
};

onMounted(async () => {
  await init();
  await addImage(carUrl, CARS_ICON_KEY, {
    width: 100,
    height: 200,
  });

  addSource(CARS_SOURCE_KEY, getEmptySource());
  addLayer(getVehicleLayer());
});
</script>

<template>
  <ion-segment-view :swipe-gesture="false">
    <ion-segment-content id="map">
      <div class="monitoring-map">
        <base-map ref="mapRef" class="monitoring-map__map" />
      </div>
    </ion-segment-content>
    <ion-segment-content id="monitoring" class="monitoring-segment segment-padding">
      <monitoring-segment @render-cars="onRenderCars" @fit-bounds="fitBoundsItems" />
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
ion-segment-view {
  touch-action: none;
  overflow: hidden;
}

.monitoring-map {
  width: 100%;
  height: 100%;
}
.segment-padding {
  padding: 16px;
}
</style>
