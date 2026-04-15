<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { MonitoringSegment } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment";
import { onBeforeUnmount, onMounted, ref } from "vue";
import carUrl from "@/assets/images/car-grey.png?url";
import { useMapLibre } from "@/composables/map/useMapLibre.ts";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { buildVehicleSource, CARS_SOURCE_KEY, getEmptySource } from "@/composables/map/sources.ts";
import { CARS_LAYER_KEY, getVehicleLayer } from "@/composables/map/layers.ts";
import { CARS_ICON_KEY } from "@/composables/map/images.ts";
import type { MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

defineProps<{
  segment: string;
}>();

const emit = defineEmits<{
  (e: "open-map"): void;
}>();

const globalBackdropStore = useGlobalBackdropStore();

const renderedCars = ref<VehicleItem[]>([]);

const { mapRef, init, addImage, addSource, addLayer, updateSource, fitBounds } = useMapLibre();

const getFilteredItemsWithCoordinated = (items: VehicleItem[]) =>
  items.filter((item) => !!item.mess.longitude && !!item.mess.latitude && !!item.mess.angle);

const getCoordinatedFromVehicles = (items: VehicleItem[]) =>
  items.map((item) => ({
    lon: item.mess.longitude,
    lat: item.mess.latitude,
  }));

const onRenderCars = (items: VehicleItem[]) => {
  const filteredItems = getFilteredItemsWithCoordinated(items);
  renderedCars.value = filteredItems;

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

const handleVehicleClick = (
  e?: MapMouseEvent & {
    features?: MapGeoJSONFeature[];
  },
) => {
  const feature = e.features?.[0];
  if (!feature) return;

  const vehicleId = feature.properties.id;
  if (!vehicleId) return;

  const vehicle = renderedCars.value.find((item) => item.id === vehicleId);
  if (!vehicle) return;

  globalBackdropStore.push("gps-monitoring-vehicle-info", {
    title: vehicle.name,
    props: {
      vehicle,
    },
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

  mapRef.value?.map.on("click", CARS_LAYER_KEY, handleVehicleClick);
});

onBeforeUnmount(() => {
  mapRef.value?.map.off("click", CARS_LAYER_KEY, handleVehicleClick);
});
</script>

<template>
  <div class="gps-monitoring-segments">
    <Transition name="fade">
      <div v-show="segment === 'map'" class="monitoring-map">
        <base-map ref="mapRef" class="monitoring-map__map" />
      </div>
    </Transition>
    <Transition name="fade">
      <div v-show="segment === 'monitoring'" class="gps-monitoring-segments__layout">
        <monitoring-segment @render-cars="onRenderCars" @fit-bounds="fitBoundsItems" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.gps-monitoring-segments {
  height: 100%;

  &__layout {
    padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;
  }
}

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
