<script setup lang="ts">
import { computed, type ComputedRef, ref, watch, watchEffect } from "vue";
import { useOrdersMineViewQuery, type RawData, type Response } from "@/api/orders/orders-mine-view.ts";
import { useQuery } from "@tanstack/vue-query";
import LinkedInfoBlock from "@/widgets/linked-info-block.vue";
import Skeleton from "./skeleton.vue";
import { formatDateString } from "@/utils/formatDate.ts";

type ListType = InstanceType<typeof LinkedInfoBlock>["$props"]["list"];

const paramsModel = defineModel<RawData>("params", { required: true });
const paginationLoading = ref(false);

const list = ref<Response["content"]>([]);
const sizeOfList = ref(0);

const contentOptions = useOrdersMineViewQuery({
  params: paramsModel,
  getUrl: (url) => url + "/!OrdersMine",
});

const { suspense, data, isPending, error } = useQuery(contentOptions);

const linkedInfoList: ComputedRef<ListType> = computed(() => {
  if (isPending.value && !paginationLoading.value) return [];
  return (
    list.value?.map((item) => ({
      title: `${item.orderNumber}`,
      to: `/order/${item.id}`,
      list: [
        {
          text: `Создатель: ${item.creator}`,
        },
        {
          text: `Статус: ${item.taskName?.rus}`,
        },
        {
          text: `Дата создания: ${formatDateString(new Date(item.createdAt))}`,
        },
      ],
    })) || []
  );
});

watchEffect(() => {
  if (error.value) {
    throw error;
  }
});

watch(
  data,
  (value) => {
    if (value) {
      list.value = (paramsModel.value.sort.page || 0) > 1 ? [...list.value, ...value.content] : value.content;
      sizeOfList.value = value.size;
      paginationLoading.value = false;
    }
  },
  {
    immediate: true,
  },
);

const isPaginationLoadable = computed(
  () => sizeOfList.value > (paramsModel.value.sort.page || 1) * (paramsModel.value.sort.rowsPerPage || 1),
);

const loadMore = () => {
  if (paginationLoading.value || !isPaginationLoadable.value || isPending.value) {
    return;
  }

  if (paramsModel.value.sort.page) {
    paramsModel.value.sort.page++;
    paginationLoading.value = true;
  }
};

await suspense();
</script>

<template>
  <div class="application-orders-block">
    <skeleton v-if="isPending && !paginationLoading" />
    <linked-info-block v-else-if="list.length" :list="linkedInfoList" />
    <div v-else class="application-orders-block__not-found">Ничего не найдено</div>
    <div
      class="application-orders-block__spinner"
      v-intersect="{
        callback: loadMore,
        options: { threshold: 0.7 },
      }"
    >
      <ion-spinner v-if="paginationLoading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application-orders-block {
  &__not-found {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }

  &__spinner {
    width: 100%;
    display: grid;
    place-items: center;
  }
}
</style>
