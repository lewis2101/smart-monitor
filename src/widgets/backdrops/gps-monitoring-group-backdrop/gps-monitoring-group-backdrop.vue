<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import Checkbox from "primevue/checkbox";
import { useQuery } from "@tanstack/vue-query";
import { useNaviGroup } from "@/api/navi/navi-group.ts";
import { ref, watchEffect } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import type { VehicleGroup } from "@/entities/vehicle-group/types.ts";
import { getVehicleList } from "@/entities/vehicle-list/getVehicleList.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";

const props = defineProps<
  {
    initialValue: VehicleGroup[];
  } & BackdropComponentProps<(groups: VehicleGroup[]) => void, (error: Error) => void>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const getInitialValueIds = () => {
  return props.initialValue.map((group) => group.id);
};

const globalSpinner = useGlobalSpinner();

const naviGroup = useNaviGroup({});
const { data: groupData, suspense, error } = useQuery(naviGroup);

const { data: vehiclesListData, suspense: vehicleListSuspense, error: vehicleListError } = getVehicleList();

const groupModel = ref<string[]>(getInitialValueIds() || []);

const handleSave = () => {
  globalSpinner.show();

  const selectedGroups = groupData.value.rows.filter((row) => groupModel.value.includes(row.id));

  const selectedVehiclesGroup = selectedGroups.map((group) => ({
    ...group,
    vehicles: group.vehicles.map((vehicle) => vehiclesListData.value.find((list) => list.id === vehicle.id)),
  })) as VehicleGroup[];

  globalSpinner.hide();
  props.onSuccess?.(selectedVehiclesGroup);
  emit("closeBackdrop");
};

watchEffect(() => {
  if (error.value) {
    throw error.value;
  }

  if (vehicleListError.value) {
    throw vehicleListError.value;
  }
});

await Promise.all([suspense(), vehicleListSuspense()]);
</script>

<template>
  <div class="gps-monitoring-group-backdrop">
    <Accordion>
      <AccordionPanel v-for="item in groupData.rows" :key="item.id" :value="item.id">
        <AccordionHeader>
          <div class="gps-monitoring-group-backdrop__group-header">
            <Checkbox v-model="groupModel" :value="item.id" size="large" @click.stop /> {{ item.name }}
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div
            v-for="(vehicle, idx) in item.vehicles"
            :key="vehicle.id"
            class="gps-monitoring-group-backdrop__group-item-vehicles"
          >
            {{ idx + 1 }}. {{ vehicle.name }}
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <div class="gps-monitoring-group-backdrop__button-wrapper">
      <ion-button class="gps-monitoring-group-backdrop__button" @click="handleSave"> Сохранить </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gps-monitoring-group-backdrop {
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;

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
    position: sticky;
    bottom: calc(8px + env(safe-area-inset-bottom));
    left: 16px;
    right: 16px;
  }

  &__button {
    width: 100%;
  }
}
</style>
