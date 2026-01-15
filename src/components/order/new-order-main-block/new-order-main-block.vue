<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import { useOrderInitialMutation } from "@/api/orders/initial-order.ts";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";
import { computed, useTemplateRef, watch } from "vue";
import { useValidateInitialMutation } from "@/api/orders/validate-initial.ts";
import { useToast } from "primevue/usetoast";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";
import { ClientLimit } from "@/components/order/client-limit";

const LIMIT_HAS_PROCESS_KEYS = ["LENKRAD_PROCESS", "PURCHASE_PROCESS"];

const props = defineProps<{
  processKey: string;
}>();

const emit = defineEmits<{
  (e: "getLabel", value: string): void;
}>();

const stepGeneratorRef = useTemplateRef("stepGeneratorRef");

const toast = useToast();
const { getErrorForToast } = useExtractErrorData();

const { mutateAsync: orderInitialMutate } = useOrderInitialMutation({});
const { mutate: orderValidateMutate, error: validateError } = useValidateInitialMutation({});

const { data: orderData } = await orderInitialMutate({
  data: {
    processKey: props.processKey,
  },
});

const createOrder = async () => {
  if (stepGeneratorRef.value) {
    orderValidateMutate({
      data: {
        ...stepGeneratorRef.value.getPayloadOfFields(),
        processKey: props.processKey,
      },
    });
  }
};

const showLimits = computed(() => LIMIT_HAS_PROCESS_KEYS.includes(props.processKey));

watch(validateError, (value) => {
  if (value) {
    toast.add(getErrorForToast(value));
  }
});

emit("getLabel", orderData.name);
</script>

<template>
  <div v-if="orderData" class="new-order-main-block">
    <div v-if="showLimits" class="new-order-main-block__limits">
      <client-limit :process-key="processKey" />
    </div>
    <div class="new-order-main-block__fields">
      <step-generator ref="stepGeneratorRef" :process-key="processKey" :fields="orderData.attributes" />
    </div>
    <div class="new-order-main-block__actions">
      <ion-button v-if="orderData.nextButtonName" class="new-order-main-block__action-button" @click="createOrder">
        {{ $t("new-order.create") }}
      </ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-order-main-block {
  width: 100%;

  &__limits {
    margin-bottom: 8px;
  }

  &__fields {
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }

  &__action-button {
    width: 100%;
  }
}
</style>
