<script setup lang="ts">
import { computed, type ComputedRef, watchEffect } from "vue";
import { useOrdersMineViewQuery } from "@/api/orders/orders-mine-view.ts";
import { useQuery } from "@tanstack/vue-query";
import LinkedInfoBlock from "@/widgets/linked-info-block.vue";
import Skeleton from "./skeleton.vue";
import { formatDateString } from "@/utils/formatDate.ts";

type ListType = InstanceType<typeof LinkedInfoBlock>["$props"]["list"];

const props = defineProps<{
  params: {
    paranoid: boolean;
    lang: string;
    sort: Record<string, any>;
  };
}>();

const contentOptions = useOrdersMineViewQuery(props.params);

const { suspense, data, isPending, error } = useQuery(contentOptions);

const linkedInfoList: ComputedRef<ListType> = computed(
  () =>
    data.value?.content.map((item) => ({
      title: `${item.orderNumber}`,
      to: `/order/${item.id}`,
      list: [
        {
          text: `Создатель: ${item.creator}`,
        },
        {
          text: `Статус: ${item.taskName.rus}`,
        },
        {
          text: `Дата создания: ${formatDateString(new Date(item.createdAt))}`,
        },
      ],
    })) || [],
);

watchEffect(() => {
  if (error.value) {
    throw error;
  }
});

await suspense();
</script>

<template>
  <div class="application-orders-block">
    <linked-info-block v-if="data?.content.length" :list="linkedInfoList" />
    <skeleton v-else-if="isPending" />
    <div v-else class="application-orders-block__not-found">Ничего не найдено</div>
  </div>
</template>

<style lang="scss" scoped>
.application-orders-block {
  &__not-found {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
