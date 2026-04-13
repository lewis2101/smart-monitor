<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import type { MonitoringSegmentEmits } from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment/types.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { ref } from "vue";
import VehicleList from "@/widgets/vehicle-list/vehicle-list.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import type { VehicleGroup } from "@/entities/vehicle-group/types.ts";
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";

type VehiclePickType = "map" | "delete" | "info";

const selectedVehicles = ref<VehicleItem[]>([]);
const selectedGroups = ref<VehicleGroup[]>([]);

const emit = defineEmits<MonitoringSegmentEmits>();

const globalBackdropStore = useGlobalBackdropStore();

const handleClickItem = async (item: VehicleItem) => {
  try {
    const result = (await globalBackdropStore.push("pick", {
      title: `Транспорт - ${item.name}`,
      props: {
        list: [
          {
            label: "Информация о транспорте",
            value: "info",
          },
          {
            label: "Показать на карте",
            value: "map",
          },
          {
            label: "Удалить транспорт",
            value: "delete",
            type: "danger",
          },
        ],
      },
    })) as VehiclePickType;

    if (result === "map") {
      emit("fit-bounds", [item]);
      return;
    }

    if (result === "delete") {
      selectedVehicles.value = selectedVehicles.value.filter((selectedItem) => selectedItem.id !== item.id);
      emit("render-cars", selectedVehicles.value);
    }

    if (result === "info") {
      openVehicleInfoBackdrop(item);
    }
  } catch (e) {
    console.log(e);
  }
};

const openVehicleInfoBackdrop = (vehicle: VehicleItem) => {
  globalBackdropStore.push("gps-monitoring-vehicle-info", {
    title: vehicle.name,
    props: {
      vehicle,
    },
  });
};

const handleClickDeleteAll = async () => {
  try {
    const result = (await globalBackdropStore.push("pick", {
      title: "Вы уверены что хотите удалить все?",
      props: {
        list: [
          {
            label: "Да",
            value: "yes",
          },
          {
            label: "Нет",
            value: "no",
          },
        ],
      },
    })) as "yes" | "no";

    if (result === "yes") {
      selectedVehicles.value = [];
      emit("render-cars", []);
    }
  } catch (e) {
    console.log(e);
  }
};

const handleClickSelect = async () => {
  try {
    const result = (await globalBackdropStore.push("gps-monitoring-vehicle-list", {
      title: "Выберите транспорт",
      props: {
        initialValue: selectedVehicles.value,
      },
      closeByScroll: true,
    })) as VehicleItem[];

    selectedVehicles.value = result;

    emit("render-cars", result);
  } catch (e) {
    console.log(e);
  }
};

const handleClickSelectGroup = async () => {
  try {
    const result = (await globalBackdropStore.push("gps-monitoring-group", {
      title: "Выберите группу транспортов",
    })) as VehicleGroup[];

    selectedGroups.value = result;

    const vehicleListOfGroups = result.flatMap((i) => i.vehicles);
    emit("render-cars", vehicleListOfGroups);
  } catch (e) {
    console.log(e);
  }
};

const handleFitBoundsAllVehicles = () => {
  emit("fit-bounds", selectedVehicles.value);
};

const handleFitBoundsAllGroups = () => {
  const flattedGroupsVehicles = selectedGroups.value.flatMap((i) => i.vehicles);
  emit("fit-bounds", flattedGroupsVehicles);
};
</script>

<template>
  <div class="monitoring-segment">
    <base-island-block title="Транспорт" :clickable="false" class="monitoring-segment__block">
      <template #top-right>
        <div class="monitoring-segment__button-wrapper">
          <ion-button
            v-if="selectedVehicles.length"
            class="monitoring-segment__button"
            fill="clear"
            size="small"
            @click="handleFitBoundsAllVehicles"
          >
            <base-icon name="pin" />
          </ion-button>
          <ion-button class="monitoring-segment__button" size="small" fill="clear" @click="handleClickSelect">
            <base-icon name="plus" />
          </ion-button>
          <ion-button
            v-if="selectedVehicles.length"
            class="monitoring-segment__button"
            fill="clear"
            size="small"
            color="danger"
            @click="handleClickDeleteAll"
          >
            <base-icon name="trash" />
          </ion-button>
        </div>
      </template>
      <vehicle-list v-if="selectedVehicles.length" :vehicle-list="selectedVehicles" @select="handleClickItem" />
      <div v-else class="monitoring-segment__non-selected">Активных транспортов нет</div>
    </base-island-block>

    <base-island-block title="Группа" :clickable="false" class="monitoring-segment__block">
      <template #top-right>
        <div class="monitoring-segment__button-wrapper">
          <ion-button
            v-if="selectedGroups.length"
            class="monitoring-segment__button"
            fill="clear"
            size="small"
            @click="handleFitBoundsAllGroups"
          >
            <base-icon name="pin" />
          </ion-button>
          <ion-button class="monitoring-segment__button" size="small" fill="clear" @click="handleClickSelectGroup">
            <base-icon name="plus" />
          </ion-button>
        </div>
      </template>

      <Accordion v-if="selectedGroups.length">
        <AccordionPanel v-for="item in selectedGroups" :key="item.id" :value="item.id">
          <AccordionHeader>
            <div class="monitoring-segment__group-header">
              {{ item.name }}
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div
              v-for="(vehicle, idx) in item.vehicles"
              :key="vehicle.id"
              class="monitoring-segment__group-item-vehicles"
            >
              {{ idx + 1 }}. {{ vehicle.name }}
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <div v-else class="monitoring-segment__non-selected">Активных групп нет</div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.monitoring-segment {
  &__group-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__group-item-vehicles {
    font-weight: 14px;
    padding-left: 8px;
    margin-bottom: 8px;
    padding-bottom: 8px;

    border-bottom: 1px $gray-light solid;
  }

  &__button-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  &__non-selected {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__block {
    margin-bottom: 16px;
  }
}
</style>
