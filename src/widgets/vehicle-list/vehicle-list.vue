<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";
import { formatDateString } from "@/utils/formatDate.ts";
import { useVirtualList } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps<{
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

const { list, containerProps, wrapperProps } = useVirtualList(
  computed(() => props.vehicleList),
  {
    itemHeight: 110,
    overscan: 10,
  },
);
</script>

<template>
  <div v-bind="containerProps" class="vehicle-list">
    <div v-bind="wrapperProps">
      <base-island-block
        v-for="item in list"
        :key="item.data.id"
        class="vehicle-list__block-item"
        @click="$emit('select', item.data)"
      >
        <div class="vehicle-list__item-wrapper">
          <div class="vehicle-list__item-content">
            <div class="vehicle-list__item-title">
              <span :class="['vehicle-list__item-status', `status-${getVehicleStatus(item.data.mess)}`]" />
              {{ item.data.name }}
            </div>
            <div class="vehicle-list__item-location">
              {{ item.data.depName }} ({{ item.data.mess.satellites }} спутников)
            </div>
            <div class="vehicle-list__item-location">
              {{ item.data.mess.timestamp ? formatDateString(new Date(item.data.mess.timestamp)) : "Нет данных" }}
            </div>
          </div>
        </div>
      </base-island-block>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vehicle-list {
  overflow-y: auto;
  height: 500px;

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
