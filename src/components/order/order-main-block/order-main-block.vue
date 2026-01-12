<script setup lang="ts">
import {useOrderActionQuery} from "@/api/orders/order-action.ts";
import {useOrderMainMutation} from "@/api/orders/order-main.ts";
import {useOrderNextMutation} from "@/api/orders/order-next.ts";
import {useQuery} from "@tanstack/vue-query";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import type {AdditionalOrderActions, OrderActions} from "@/components/step-generator/types.ts";
import {computed, useTemplateRef, watch} from "vue";
import {useOrderSaveMutation} from "@/api/orders/order-save.ts";
import {useGlobalSpinner} from "@/stores/use-global-spinner/use-global-spinner.ts";
import {useToast} from "primevue/usetoast";
import {useExtractErrorData} from "@/composables/use-extract-error-data.ts";
import OrderMoreButtons from "@/components/order/order-more-buttons/order-more-buttons.vue";

const COMPLETE_TASK_NAME = "COMPLETE";

const props = defineProps<{
  orderId: string;
}>();

const stepGeneratorRef = useTemplateRef("stepGeneratorRef");
const toast = useToast();
const {getErrorForToast} = useExtractErrorData();

const orderActionQuery = useOrderActionQuery({
  getUrl: (url) => url + "/" + props.orderId,
  keys: [() => props.orderId],
});

const {mutateAsync: orderMainMutate} = useOrderMainMutation({});
const {mutateAsync: orderNextMutate} = useOrderNextMutation({});
const {
  mutate: orderSaveMutate,
  isPending: savePending,
  error: saveError
} = useOrderSaveMutation({});

const globalSpinner = useGlobalSpinner();

const {data: orderData, suspense} = useQuery({
  ...orderActionQuery,
  enabled: () => !!props.orderId,
});

await Promise.all([
  suspense(),
  orderMainMutate({
    data: {
      orderId: props.orderId,
    }
  }),
]);

const currentUserTask = computed(() =>
  orderData.value?.processCompleted ? COMPLETE_TASK_NAME : orderData.value?.currentTask,
);

const orderNextData = await orderNextMutate({
  data: {
    orderId: props.orderId,
    currentUserTask: currentUserTask.value,
  }
});

const orderActions: Record<OrderActions | AdditionalOrderActions, () => void> = {
  CONFIRM: () => {
    console.log("CONFIRM");
  },
  RATE_THE_TRIP: () => {
    if (stepGeneratorRef.value?.fieldsModel) {
      orderSaveMutate({
        ...stepGeneratorRef.value.fieldsModel,
        currentUserTask: currentUserTask.value,
        userTaskCompleteEvent: "RATE_THE_TRIP",
        orderId: props.orderId,
      });
      console.log("FIELDS MODEL: ", stepGeneratorRef.value?.fieldsModel);
    }
  },
  REWORK: () => {
    console.log("TO_REWORK");
  },
  TO_REWORK: () => {
    console.log("TO_REWORK");
  },
  CANCEL: () => {
    console.log("CANCEL");
  },
  duplicate: () => {
    console.log("duplicate")
  }
};

const orderDisabled = computed(() => !orderData.value?.permissions.canComplete);

// const orderMainActionButton = computed(() => {
//   if (!orderData.value && !orderData.value.actions) {
//     return null;
//   }
//   if (!Object.keys(orderData.value.actions).length) {
//     return null;
//   }
//
//   return [...orderData.value.actions, ...orderNextData.buttons].reduce((acc, curr) => {
//     const currentOrderAction = orderActions[curr];
//     if (!acc) {
//       return currentOrderAction;
//     }
//     if (currentOrderAction.order < acc.order) {
//       return currentOrderAction;
//     }
//     return acc;
//   }, null);
// });

watch(savePending, (value) => {
  if (value) {
    globalSpinner.show();
  } else {
    globalSpinner.hide();
  }
});

watch(saveError, (value) => {
  if (value) {
    toast.add(getErrorForToast(value));
  }
});
</script>

<template>
  <div v-if="orderData" class="order-main-block">
    <div class="order-main-block__status-title">
      {{ orderNextData.name }}
    </div>
    <div class="order-main-block__fields">
      <step-generator
        ref="stepGeneratorRef"
        :process-key="orderNextData.processKey"
        :fields="orderNextData.attributes"
        :disabled="orderDisabled"
      />
    </div>
    <order-more-buttons
      :action-buttons="orderData.actions"
      :additional-buttons="orderNextData.buttons"
    />
  </div>
</template>

<style scoped lang="scss">
.order-main-block {
  width: 100%;

  &__status-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;

    color: $white;
    padding: 4px 12px;
    background: $main-color;
    border-radius: 20px;
    width: fit-content;

    margin-bottom: 16px;
  }

  &__fields {
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__action-button {
    width: 100%;
  }
}
</style>
