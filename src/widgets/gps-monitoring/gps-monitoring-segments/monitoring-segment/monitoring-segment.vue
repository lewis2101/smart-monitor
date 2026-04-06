<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { getVehicleList } from "@/entities/vehicle-list/getVehicleList.ts";
import { formatDateString } from "@/utils/formatDate.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

const { data, suspense } = getVehicleList();

const getVehicleStatus = (mess: VehicleItem["mess"]): "active" | "offline" | "unknown" => {
  if (!mess.latitude && !mess.longitude && !mess.satellites) {
    return "unknown";
  }

  if (!mess.movement && !mess.speed && !mess.ignition) {
    return "offline";
  }

  return "active";
};

await suspense();
</script>

<template>
  <div class="monitoring-segment">
    <base-island-block title="Транспорт" :clickable="false" class="monitoring-segment__block">
      <base-island-block v-for="item in data" :key="item.id" class="monitoring-segment__block-item">
        <div class="monitoring-segment__item-wrapper">
          <div class="monitoring-segment__item-content">
            <div class="monitoring-segment__item-title">
              <span :class="['monitoring-segment__item-status', `status-${getVehicleStatus(item.mess)}`]" />
              {{ item.name }}
            </div>
            <div class="monitoring-segment__item-location">
              {{ item.depName }} ({{ item.mess.satellites }} спутников)
            </div>
            <div class="monitoring-segment__item-location">
              {{ item.mess.timestamp ? formatDateString(new Date(item.mess.timestamp)) : "Нет данных" }}
            </div>
          </div>
          <div class="monitoring-segment__item-menu">
            <base-icon name="crosshair" />
          </div>
        </div>
      </base-island-block>
    </base-island-block>

    <base-island-block title="Группа" :clickable="false" class="monitoring-segment__block">
      Группа - 1
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.monitoring-segment {
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
