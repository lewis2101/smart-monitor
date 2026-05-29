<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { getVehicleList } from "@/entities/vehicle-list/getVehicleList.ts";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { formatDateString } from "@/utils/formatDate.ts";
import { ref, watch } from "vue";
import Checkbox from "primevue/checkbox";
import BaseInput from "@/components/base/base-input/base-input.vue";
import type { GpsMonitoringVehicleListBackdropProps } from "@/widgets/backdrops/gps-monitoring-vehicle-list-backdrop/types.ts";
import { useVirtualList, watchDebounced } from "@vueuse/core";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const props = defineProps<GpsMonitoringVehicleListBackdropProps>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

type FilterValues = "byModel" | "byNumber" | "byFilial" | "byStatus" | "bySatellites" | "byActive";
const filterList: {
  label: string;
  value: FilterValues;
}[] = [
  {
    label: "По модели",
    value: "byModel",
  },
  {
    label: "По номеру",
    value: "byNumber",
  },
  {
    label: "По филиалу",
    value: "byFilial",
  },
  {
    label: "По статусу",
    value: "byStatus",
  },
  {
    label: "По спутникам",
    value: "bySatellites",
  },
  {
    label: "По связам",
    value: "byActive",
  },
];

const getInitialValue = () => {
  if (props.initialValue) {
    return props.initialValue.map((val) => val.id);
  }
  return [];
};

const { data, suspense, error } = getVehicleList();
const globalBackdropStore = useGlobalBackdropStore();

const selectModel = ref<number[]>(getInitialValue());
const searchModel = ref("");
const allSelectedModel = ref(false);

const getVehicleStatus = (mess: VehicleItem["mess"]): "active" | "offline" | "unknown" => {
  if (!mess.latitude && !mess.longitude && !mess.satellites) {
    return "unknown";
  }

  if (!mess.movement && !mess.speed && !mess.ignition) {
    return "offline";
  }

  return "active";
};

const handleSave = () => {
  const selectedItems = data.value.filter((item) => selectModel.value.includes(item.id));

  props.onSuccess?.(selectedItems);
  emit("closeBackdrop");
};

const handleClickAllSelected = () => {
  allSelectedModel.value = !allSelectedModel.value;
};

const handleClickFilter = async () => {
  try {
    const result = (await globalBackdropStore.push("select", {
      title: "Фильтр",
      props: {
        list: filterList,
      },
    })) as FilterValues;

    console.log({ result });
  } catch (e) {
    console.log(e);
  }
};

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: 110,
  overscan: 10,
});

watch(allSelectedModel, (value) => {
  if (value) {
    selectModel.value = data.value.map((item) => item.id);
  } else {
    selectModel.value = [];
  }
});

watchDebounced(
  searchModel,
  (value) => {
    console.log({ value });
  },
  {
    debounce: 500,
  },
);

watch(error, (value) => {
  if (value) {
    throw value;
  }
});

await suspense();
</script>

<template>
  <div v-bind="containerProps" class="gps-monitoring-vehicle-list-backdrop">
    <div class="gps-monitoring-vehicle-list-backdrop__search">
      <div class="gps-monitoring-vehicle-list-backdrop__input-wrapper">
        <base-input v-model="searchModel" placeholder="Поиск" class="gps-monitoring-vehicle-list-backdrop__input" />
      </div>
      <div class="gps-monitoring-vehicle-list-backdrop__filter">
        <ion-button size="small" @click="handleClickFilter"> Фильтр </ion-button>
        <ion-button size="small" @click="handleClickAllSelected">
          {{ allSelectedModel ? "Очистить всё" : "Выбрать всё" }}
        </ion-button>
      </div>
    </div>
    <div v-bind="wrapperProps">
      <base-island-block
        v-for="item in list"
        :key="item.data.id"
        is="label"
        :class="['gps-monitoring-vehicle-list-backdrop__block-item', selectModel.includes(item.data.id) && 'selected']"
        :clickable="false"
      >
        <div class="gps-monitoring-vehicle-list-backdrop__item-wrapper">
          <div class="ps-monitoring-vehicle-list-backdrop__select">
            <checkbox v-model="selectModel" :value="item.data.id" />
          </div>
          <div class="gps-monitoring-vehicle-list-backdrop__item-content">
            <div class="gps-monitoring-vehicle-list-backdrop__item-title">
              <span
                :class="[
                  'gps-monitoring-vehicle-list-backdrop__item-status',
                  `status-${getVehicleStatus(item.data.mess)}`,
                ]"
              />
              {{ item.data.name }}
            </div>
            <div class="gps-monitoring-vehicle-list-backdrop__item-location">
              {{ item.data.depName }} ({{ item.data.mess.satellites }} спутников)
            </div>
            <div class="gps-monitoring-vehicle-list-backdrop__item-location">
              {{ item.data.mess.timestamp ? formatDateString(new Date(item.data.mess.timestamp)) : "Нет данных" }}
            </div>
          </div>
        </div>
      </base-island-block>
      <Transition name="fade">
        <div v-if="selectModel.length" class="gps-monitoring-vehicle-list-backdrop__button-wrapper">
          <ion-button class="gps-monitoring-vehicle-list-backdrop__button" @click="handleSave">
            Сохранить ({{ selectModel.length }})
          </ion-button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gps-monitoring-vehicle-list-backdrop {
  padding: 100px 8px calc(8px + env(safe-area-inset-bottom)) 8px;
  overflow-y: auto;
  height: 600px;

  &__all-checkbox {
    margin-right: 8px;
  }

  &__input-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__input {
    width: 100%;
  }

  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    //background: $gray-light;
    border-radius: 12px;
    height: 100%;
    padding: 6px 12px;
  }

  &__button-wrapper {
    position: sticky;
    bottom: 0;
    left: 8px;
    right: 8px;
  }

  &__button {
    width: 100%;
  }

  &__search {
    position: fixed;
    z-index: 1;
    top: 64px;
    left: 8px;
    right: 8px;
    margin-bottom: 8px;

    background: $white;
  }

  &__selected {
    background: $secondary-color;
    color: $white;
    padding: 8px 12px;
    border-radius: 8px;
    margin-top: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__item-status {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .status-active {
    background: $secondary-color;
  }

  .status-offline {
    background: $danger;
  }

  .status-unknown {
    background: $gray-dark;
  }

  &__content {
  }

  &__block-item {
    padding: 20px;
    margin-bottom: 8px;

    border: 1px transparent solid;

    transition: 0.3s all ease-in-out;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .selected {
    border: 1px $secondary-color solid;
  }

  &__item-title {
    display: flex;
    align-items: center;
    gap: 6px;

    font-weight: bold;
    margin-bottom: 8px;
  }

  &__item-location {
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__item-menu {
    color: $secondary-color;
  }

  &__item-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
