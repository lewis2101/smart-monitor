<script setup lang="ts">
import { computed, type ComputedRef, reactive } from "vue";
import { useOrdersMineHeaderQuery } from "@/api/orders/order-mine-header.ts";
import { useOrdersMineViewQuery } from "@/api/orders/orders-mine-view.ts";
import { useQuery } from "@tanstack/vue-query";
import LinkedInfoBlock from "@/widgets/linked-info-block.vue";

type ListType = InstanceType<typeof LinkedInfoBlock>["$props"]["list"];

const headerParams = reactive({
  tabName: "!OrdersMine",
  lng: "rus",
});

const contentParams = reactive({
  paranoid: false,
  lang: "rus",
  sort: {
    descending: false,
    rowsPerPage: 100,
    page: 1,
  },
});

const headerOptions = useOrdersMineHeaderQuery(headerParams);
const contentOptions = useOrdersMineViewQuery(contentParams);

const { suspense: headersSuspense } = useQuery(headerOptions);
const { suspense: contentSuspense, data } = useQuery(contentOptions);

const linkedInfoList: ComputedRef<ListType> = computed(() =>
  data.value.content.map((item) => ({
    title: `${item.orderNumber}`,
    list: [
      {
        text: `Создатель: ${item.creator}`,
      },
      {
        text: `Статус: ${item.taskName.rus}`,
      },
      {
        text: `Дата создания: ${item.createdAt}`,
      },
    ],
  })),
);

await Promise.all([headersSuspense(), contentSuspense()]);
</script>

<template>
  <div class="application-orders-block">
    <linked-info-block :list="linkedInfoList" />
  </div>
</template>

<style lang="scss" scoped>
.application-orders-block {
}
</style>
