<script setup lang="ts">
import { IonSegmentContent, IonSegmentView } from "@ionic/vue";
import BaseMap from "@/components/map/base-map.vue";
import { MonitoringSegment } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment";
import { onMounted } from "vue";
import carUrl from "@/assets/images/car-grey.png?url";
import { useMap } from "@/composables/map/useMap.ts";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

const emit = defineEmits<{
  (e: "open-map"): void;
}>();

const CARS_SOURCE_KEY = "cars-source";
const CARS_LAYER_KEY = "cars-layer";
const CARS_ICON_KEY = "cars-icon";

const { mapRef, init, addImage, addSource, addLayer, updateSource, fitBounds } = useMap();

const onRenderCars = async (items: VehicleItem[]) => {
  const filteredItems = items.filter((item) => !!item.mess.longitude && !!item.mess.latitude);

  updateSource(CARS_SOURCE_KEY, {
    type: "FeatureCollection",
    features: filteredItems.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.mess.longitude, item.mess.latitude],
      },
      properties: {
        id: item.id,
        name: item.name,
        icon: CARS_ICON_KEY,
      },
    })),
  });

  emit("open-map");

  await fitBounds(
    filteredItems.map((item) => ({
      lon: item.mess.longitude,
      lat: item.mess.latitude,
    })),
    {
      padding: 20,
      zoom: 13,
    },
  );
};

const fitBoundOnItem = (item: VehicleItem) => {
  emit("open-map");

  fitBounds(
    [
      {
        lon: item.mess.longitude,
        lat: item.mess.latitude,
      },
    ],
    {
      padding: 20,
      zoom: 13,
    },
  );
};

onMounted(async () => {
  await init();
  await addImage(carUrl, CARS_ICON_KEY, {
    width: 100,
    height: 200,
  });

  addSource(CARS_SOURCE_KEY, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  addLayer({
    id: CARS_LAYER_KEY,
    type: "symbol",
    source: CARS_SOURCE_KEY,
    layout: {
      "icon-image": ["get", "icon"],
      "icon-size": 0.5,
      "text-field": ["get", "name"],
      "text-offset": [0, 1.2],
      "text-anchor": "top",
    },
  });
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
      <monitoring-segment @render-cars="onRenderCars" @fit-bounds="fitBoundOnItem" />
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
