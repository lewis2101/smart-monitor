<script setup lang="ts">
import { reactive } from "vue";
import { useOrdersMineHeaderQuery } from "@/api/orders/order-mine-header.ts";
import { useOrdersMineViewQuery } from "@/api/orders/orders-mine-view.ts";
import { useQuery } from "@tanstack/vue-query";

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
const { suspense: contentSuspense } = useQuery(contentOptions);

await Promise.all([headersSuspense(), contentSuspense()]);
</script>

<template>
  <div>ORDERS</div>
</template>

<style scoped></style>
