<script setup lang="ts">
import { useCurrentLimitQuery } from "@/api/stat/current-limit.ts";
import { useQuery } from "@tanstack/vue-query";
import { formatSum } from "@/utils/formatSum.ts";

const props = defineProps<{
  processKey: string;
}>();

const currentLimitQuery = useCurrentLimitQuery({
  params: {
    processName: props.processKey,
  },
});

const { data, suspense } = useQuery(currentLimitQuery);

await suspense();
</script>

<template>
  <div v-if="data && data.length" class="client-limit">
    <div class="client-limit__title">Остаток лимита</div>
    <div v-for="(item, idx) in data" :key="idx" class="limit-item">
      <div class="limit-item__title">{{ item.number }} от {{ item.date }}</div>
      <div class="limit-item__value">
        <div class="limit-item__value-title">Остаток лимита:</div>
        <div class="limit-item__value-data">{{ formatSum(item.balance || 0) }}</div>
      </div>
      <div class="limit-item__value">
        <div class="limit-item__value-title">Израсходовано:</div>
        <div class="limit-item__value-data">{{ formatSum(item.spent || 0) }}</div>
      </div>
      <div class="limit-item__value">
        <div class="limit-item__value-title">Заблокировано:</div>
        <div class="limit-item__value-data">{{ formatSum(item.blocked || 0) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.client-limit {
  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px #f2f2f7 solid;
  }
}

.limit-item {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
  }

  &__value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;

    font-size: 14px;
  }
}
</style>
