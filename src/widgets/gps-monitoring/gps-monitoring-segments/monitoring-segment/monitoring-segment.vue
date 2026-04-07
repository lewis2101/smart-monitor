<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import type { MonitoringSegmentEmits } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment/types.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { ref } from "vue";
import VehicleList from "@/widgets/vehicle-list/vehicle-list.vue";

const selectedVehicles = ref<VehicleItem[]>([]);

const emit = defineEmits<MonitoringSegmentEmits>();

const globalBackdropStore = useGlobalBackdropStore();

const handleClickItem = (item: VehicleItem) => {
  emit("fit-bounds", item);
};

const handleClickSelect = async () => {
  try {
    const result = (await globalBackdropStore.push("gps-monitoring-vehicle-list", {
      title: "Выберите автомобили",
      props: {
        initialValue: selectedVehicles.value,
      },
    })) as VehicleItem[];

    selectedVehicles.value = result;

    emit("render-cars", result);
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="monitoring-segment">
    <base-island-block title="Транспорт" :clickable="false" class="monitoring-segment__block">
      <template #top-right>
        <ion-button size="small" @click="handleClickSelect"> Выбрать элементы </ion-button>
      </template>
      <vehicle-list v-if="selectedVehicles.length" :vehicle-list="selectedVehicles" @select="handleClickItem" />
      <div v-else class="monitoring-segment__non-selected">Активные автомобили не выбраны</div>
    </base-island-block>

    <base-island-block title="Группа" :clickable="false" class="monitoring-segment__block">
      Группа - 1
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.monitoring-segment {
  &__non-selected {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
