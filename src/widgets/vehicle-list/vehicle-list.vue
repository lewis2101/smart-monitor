<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { formatDateString } from "@/utils/formatDate.ts";

defineProps<{
  vehicleList: VehicleItem[];
}>();

defineEmits<{
  (e: "select", val: VehicleItem): void;
}>();

const getVehicleStatus = (mess: VehicleItem["mess"]): "active" | "offline" | "unknown" => {
  if (!mess.latitude && !mess.longitude && !mess.satellites) {
    return "unknown";
  }

  if (!mess.movement && !mess.speed && !mess.ignition) {
    return "offline";
  }

  return "active";
};
</script>

<template>
  <div class="vehicle-list">
    <base-island-block
      v-for="item in vehicleList"
      :key="item.id"
      class="vehicle-list__block-item"
      @click="$emit('select', item)"
    >
      <div class="vehicle-list__item-wrapper">
        <div class="vehicle-list__item-content">
          <div class="vehicle-list__item-title">
            <span :class="['vehicle-list__item-status', `status-${getVehicleStatus(item.mess)}`]" />
            {{ item.name }}
          </div>
          <div class="vehicle-list__item-location">{{ item.depName }} ({{ item.mess.satellites }} спутников)</div>
          <div class="vehicle-list__item-location">
            {{ item.mess.timestamp ? formatDateString(new Date(item.mess.timestamp)) : "Нет данных" }}
          </div>
        </div>
        <div class="vehicle-list__item-menu">
          <base-icon name="crosshair" />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.vehicle-list {
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

  &__block-item {
    padding: 20px;
    margin-bottom: 16px;
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
    justify-content: space-between;
  }
}
</style>
