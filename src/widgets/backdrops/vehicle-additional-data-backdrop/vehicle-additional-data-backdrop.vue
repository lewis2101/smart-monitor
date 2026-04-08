<script setup lang="ts">
import type { VehicleItem } from "@/entities/vehicle-list/types.ts";

defineProps<{
  vehicle: VehicleItem;
}>();
</script>

<template>
  <div class="vehicle-additional-data-backdrop">
    <div>
        {{ vehicle }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.vehicle-additional-data-backdrop {
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;
}
</style>
