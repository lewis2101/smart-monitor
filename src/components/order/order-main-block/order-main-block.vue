<script setup lang="ts">
import { useOrderActionQuery } from "@/api/orders/order-action.ts";
import { useOrderMainMutation } from "@/api/orders/order-main.ts";
import { useOrderNextMutation } from "@/api/orders/order-next.ts";
import { useQuery } from "@tanstack/vue-query";
import FieldInput from "@/components/step-generator/Fieldinput/FieldInput.vue";
import LinkGenerator from "@/components/step-generator/LinkGenerator/LinkGenerator.vue";
import DateTimeField from "@/components/step-generator/DateTimeField/DateTimeField.vue";
import type { FieldInputType } from "../../../../types/FieldType.ts";
import { type Component, markRaw, type Raw } from "vue";

const props = defineProps<{
  orderId: string;
}>();

const orderActionQuery = useOrderActionQuery({
  getUrl: (url) => url + "/" + props.orderId,
  keys: [() => props.orderId],
});

const { mutateAsync: orderMainMutate } = useOrderMainMutation({});
const { mutateAsync: orderNextMutate } = useOrderNextMutation({});

const { data, suspense } = useQuery({
  ...orderActionQuery,
  enabled: () => !!props.orderId,
});

await Promise.all([
  suspense(),
  orderMainMutate({
    orderId: props.orderId,
  }),
]);

const orderNextData = await orderNextMutate({
  orderId: props.orderId,
  currentUserTask: data.value.currentTask,
});

const fieldsMap: Record<FieldInputType, Raw<Component> | null> = {
  REF: markRaw(FieldInput),
  LINK_GENERATOR: markRaw(LinkGenerator),
  DATE_TIME: markRaw(DateTimeField),
  STRING: null,
  INTEGER: null,
  ARRAY: null,
  LOCAL: null,
  NUMBER: null,
  AddressSelector: null,
  TEXT: null,
};
</script>

<template>
  <div class="order-main-block">
    <div class="order-main-block__status-title">
      {{ orderNextData.name }}
    </div>
    <div class="order-main-block__fields">
      <template v-for="field in orderNextData.attributes" :key="field.value">
        <component :is="fieldsMap[field.clientType]" class="order-main-block__field" :field="field" />
      </template>
      <!--      <link-generator link="https://smartlfleet.kz/asdf/asdf" class="order-main-block__field" />-->
      <!--      <field-input-->
      <!--        v-for="field in orderNextData.attributes"-->
      <!--        :key="field.value"-->
      <!--        :field="field"-->
      <!--        class="order-main-block__field"-->
      <!--      />-->
    </div>
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
  }

  &__field {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
