<script setup lang="ts">
import { useOrderActionQuery } from "@/api/orders/order-action.ts";
import { useOrderMainMutation } from "@/api/orders/order-main.ts";
import { useOrderNextMutation } from "@/api/orders/order-next.ts";
import { useQuery } from "@tanstack/vue-query";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import type { AdditionalOrderActions, OrderActions } from "@/components/step-generator/types.ts";
import { computed, ref, useTemplateRef } from "vue";
import { useOrderSaveMutation } from "@/api/orders/order-save.ts";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useToast } from "primevue/usetoast";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";
import OrderMoreButtons from "@/components/order/order-more-buttons/order-more-buttons.vue";
import ClientLimit from "@/components/order/client-limit/client-limit.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useRole } from "@/composables/useRole.ts";
import { useRefreshPageInjector } from "@/composables/use-refresh-page.ts";
import OrderHistory from "@/components/order/order-history/order-history.vue";
import { useOrderActionCompleteMutation } from "@/api/orders/order-action-complete.ts";
import { useIonRouter } from "@ionic/vue";
import { OrderRoutes } from "@/router/router-list.ts";
import { formatDateString } from "@/utils/formatDate.ts";

const LIMIT_HAS_PROCESS_KEYS = ["LENKRAD_PROCESS", "PURCHASE_PROCESS"];
const COMPLETE_TASK_NAME = "COMPLETE";

const props = defineProps<{
  orderId: string;
}>();

const emit = defineEmits<{
  (e: "getLabel", value: string): void;
}>();

const stepGeneratorRef = useTemplateRef("stepGeneratorRef");
const toast = useToast();
const { getErrorForToast } = useExtractErrorData();

const router = useIonRouter();

const { clientInfoStorage } = useAuthStorage();
const { isClient } = useRole(() => clientInfoStorage.value.type);

const { getTriesCount, refreshPageWithTries } = useRefreshPageInjector();

const checkOrderDataState = async () => {
  const { currentTask, currentTaskType, state, processCompleted } = orderData.value;

  if ((currentTask && currentTaskType === "USER" && state === "RUNNING") || processCompleted) {
    return;
  }

  if (getTriesCount() > 10 || state === "ERROR") {
    return;
  }

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      refreshPageWithTries();
      resolve();
    }, 3000);
  });
};

const orderActionQuery = useOrderActionQuery({
  getUrl: (url) => url + "/" + props.orderId,
  keys: [() => props.orderId],
});

const { mutate: orderMainMutate, data: orderMainResponse } = useOrderMainMutation({});
const { mutateAsync: orderNextMutate } = useOrderNextMutation({});
const { mutateAsync: orderSaveMutate } = useOrderSaveMutation({});
const { mutateAsync: orderActionCompleteMutate } = useOrderActionCompleteMutation({});

const orderMainData = computed(() => {
  if (orderMainResponse.value) {
    emit("getLabel", orderMainResponse.value.data.number);
    return orderMainResponse.value.data;
  }
  return null;
});

const orderExecutionId = ref(0);
const globalSpinner = useGlobalSpinner();

const { data: orderData, suspense } = useQuery({
  ...orderActionQuery,
  enabled: () => !!props.orderId,
  staleTime: 0,
});

await Promise.all([
  suspense(),
  orderMainMutate({
    data: {
      orderId: props.orderId,
    },
  }),
]);

await checkOrderDataState();
orderExecutionId.value = orderData.value.orderExecutionId;

const currentUserTask = computed(() =>
  orderData.value?.processCompleted ? COMPLETE_TASK_NAME : orderData.value?.currentTask,
);

const isBpmnButtonsVisible = computed(() => orderData.value.permissions.canComplete);

const { data: orderNextData } = await orderNextMutate({
  data: {
    orderId: props.orderId,
    currentUserTask: currentUserTask.value,
  },
});

const saveOrder = async (action: OrderActions) => {
  if (!stepGeneratorRef.value) return;

  const payload = {
    ...stepGeneratorRef.value.getPayloadOfFields(),
  };

  try {
    globalSpinner.show();

    await orderSaveMutate({
      data: {
        ...payload,
        currentUserTask: currentUserTask.value,
        userTaskCompleteEvent: action,
        orderId: props.orderId,
      },
    });

    await orderActionCompleteMutate({
      data: {
        buttonAction: action,
        order: payload,
        orderExecutionId: orderExecutionId.value,
        saveData: {
          ...payload,
          currentUserTask: currentUserTask.value,
          userTaskCompleteEvent: action,
        },
      },
    });

    router.replace({
      name: OrderRoutes.successOrder,
      params: {
        orderId: props.orderId,
        status: "UPDATED",
      },
      query: {
        date: new Date().toISOString(),
      },
    });
  } catch (e) {
    console.log(e);
    toast.add(getErrorForToast(e));
  } finally {
    globalSpinner.hide();
  }
};

const orderActions: Record<OrderActions | AdditionalOrderActions, () => void> = {
  CONFIRM: () => saveOrder("CONFIRM"),
  FINISH: () => saveOrder("FINISH"),
  TO_CONFIRM: () => saveOrder("TO_CONFIRM"),
  RATE_THE_TRIP: () => saveOrder("RATE_THE_TRIP"),
  REWORK: () => saveOrder("REWORK"),
  TO_REWORK: () => saveOrder("TO_REWORK"),
  CANCEL: () => saveOrder("CANCEL"),
  NEXT: () => saveOrder("NEXT"),
  SAVE: () => saveOrder("SAVE"),
  NOT_CONFIRM: () => saveOrder("NOT_CONFIRM"),
  VEHICLE_IS_CAME: () => saveOrder("VEHICLE_IS_CAME"),
  VEHICLE_IS_NOT_CAME: () => saveOrder("VEHICLE_IS_NOT_CAME"),
  CONFIRM_WITH_CHANGES: () => saveOrder("CONFIRM_WITH_CHANGES"),
  ACCEPT: () => saveOrder("ACCEPT"),
  HAND_OVER: () => saveOrder("HAND_OVER"),
  ACCESS: () => saveOrder("ACCESS"),
  NO_ACCESS: () => saveOrder("NO_ACCESS"),
  RESEND_FOR_PAYMENT: () => saveOrder("RESEND_FOR_PAYMENT"),
  TO_REGENERATE: () => saveOrder("TO_REGENERATE"),
  ASSIGN_TO_ME: () => {
    console.log("ASSIGN_TO_ME");
  },
  SEND_FOR_PAYMENT: () => {
    console.log("SEND_FOR_PAYMENT");
  },
  duplicate: () => {
    console.log("duplicate");
  },
};

const handleActionClick = (action: OrderActions | AdditionalOrderActions) => {
  if (action) {
    orderActions[action]();
  }
};

const orderDisabled = computed(() => !orderData.value?.permissions.canComplete);
const showLimits = computed(() => LIMIT_HAS_PROCESS_KEYS.includes(orderNextData?.processKey));
</script>

<template>
  <div class="order-main-block">
    <div v-if="orderMainData" class="order-main-block__order-info">
      <div class="order-main-block__info-text">
        <span class="bold">ID: </span> {{ orderId }}
      </div>
      <div class="order-main-block__info-text">
        <span class="bold">Создана:</span> {{ formatDateString(orderMainData.createdDate, { time: true }) }}
      </div>
      <div class="order-main-block__info-text">
        <span class="bold">Создатель:</span> {{ orderMainData.creatorName }}
      </div>
      <div class="order-main-block__info-text"><span class="bold">Статус:</span> {{ orderNextData.name }}</div>
    </div>
    <order-history :order-id="orderId" class="order-main-block__history" />
    <div v-if="isClient && showLimits" class="order-main-block__limits">
      <client-limit :process-key="orderNextData.processKey" />
    </div>
    <div class="order-main-block__fields">
      <step-generator
        ref="stepGeneratorRef"
        :process-key="orderNextData.processKey"
        :fields="orderNextData.attributes"
        :disabled="orderDisabled"
        :order-id="orderId"
      />
    </div>
    <order-more-buttons
      :action-buttons="isBpmnButtonsVisible ? orderData.actions || [] : []"
      :additional-buttons="orderNextData.buttons || []"
      @click-action="handleActionClick"
    />
  </div>
</template>

<style scoped lang="scss">
.order-main-block {
  width: 100%;

  &__history {
    margin-bottom: 8px;
  }

  &__limits {
    margin-bottom: 8px;
  }

  &__order-info {
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;
    padding: 16px;

    border-bottom: 1px #f2f2f7 solid;
    margin-bottom: 8px;
  }

  &__status-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;
    margin-bottom: 8px;
  }

  &__info-text {
    margin-bottom: 4px;
    font-size: 14px;
    color: $gray-dark;

    .bold {
      color: $black;
      font-weight: 600;
    }
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
