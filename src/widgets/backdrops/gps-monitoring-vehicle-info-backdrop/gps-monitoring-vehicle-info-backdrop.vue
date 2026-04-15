<script setup lang="ts">
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { computed } from "vue";

const props = defineProps<{
  vehicle: VehicleItem;
}>();

const isEnabled = (value: any) => {
  if (!!value) return "Да";
  return "Нет";
};

const listData = computed(() => [
  {
    label: "Устройство",
    value: `${props.vehicle.devicename} (${props.vehicle.imei})`,
  },
  {
    label: "Широта",
    value: props.vehicle.mess.longitude?.toFixed(5),
  },
  {
    label: "Долгота",
    value: props.vehicle.mess.latitude?.toFixed(5),
  },
  {
    label: "Скорость",
    value: `${props.vehicle.mess.speed} км/ч`,
  },
  {
    label: "Высота над уровнем моря",
    value: `${props.vehicle.mess.altitude} м`,
  },
  {
    label: "Связь с спутниками",
    value: "", // TODO
  },
  {
    label: "Количество спутников",
    value: props.vehicle.mess.satellites,
  },
  {
    label: "В движении",
    value: isEnabled(props.vehicle.mess.movement),
  },
  {
    label: "Зажигание",
    value: isEnabled(props.vehicle.mess.ignition),
  },
  {
    label: "Пробег",
    value: "", // TODO
  },
  {
    label: "Напряжение АКБ",
    value: "", // TODO
  },
  {
    label: "Напряжение батареи",
    value: "", // TODO
  },
  {
    label: "Батарея",
    value: "", // TODO
  },
]);
</script>

<template>
  <div class="gps-monitoring-vehicle-info-backdrop">
    <div v-for="item in listData" :key="item.label" class="gps-monitoring-vehicle-info-backdrop__item">
      <div class="gps-monitoring-vehicle-info-backdrop__item-label">{{ item.label }}:</div>
      <div class="gps-monitoring-vehicle-info-backdrop__item-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gps-monitoring-vehicle-info-backdrop {
  padding: 16px 16px calc(8px + env(safe-area-inset-bottom)) 16px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px $gray-light solid;

    gap: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-label {
    font-weight: bold;
    color: $gray-dark;
  }

  &__item-value {
    font-size: 14px;
    text-align: right;
  }
}
</style>
