<script setup lang="ts">
import ApplicationOrdersBlock from "@/components/application/application-orders-block/application-orders-block.vue";
import Skeleton from "./skeleton.vue";
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";

type Params = InstanceType<typeof ApplicationOrdersBlock>["$props"]["params"];

const paramsModel = defineModel<Params>("params", { required: true });

defineProps<{
  ordersType: string;
}>();
</script>

<template>
  <error-boundary>
    <TransitionSuspense>
      <application-orders-block v-bind="{ ...$attrs, ...$props }" v-model:params="paramsModel" />
      <template #fallback>
        <skeleton />
      </template>
    </TransitionSuspense>
    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
