<script setup lang="ts">
import { IonButton, IonSpinner } from "@ionic/vue";
import type { StepField } from "@/components/step-generator/types.ts";
import { computed, reactive, watch } from "vue";
import { type OrderPartsContentChild, useNewOrderPartsQuery } from "@/api/orders/new-order-parts.ts";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import SelectedWork from "@/components/step-generator/WorksList/SelectedWork.vue";

const DEPENDENCY_FIELD_KEY = "vehicleId";

const props = withDefaults(
  defineProps<{
    field: StepField;
    stepModel: Record<string, { id: string | number } | undefined>;
    processKey: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const model = defineModel<OrderPartsContentChild[]>({ required: true, default: () => [] });

const modelProxy = computed({
  get: () => model.value.map((item) => item.id),
  set: (e: number[]) => {
    model.value = findItems(e);
  },
});

const toast = useToast();
const globalBackdropStore = useGlobalBackdropStore();

const newOrderPartsParams = reactive({
  lang: "rus",
  vehicleId: "",
  processKey: props.processKey,
});

const newOrderPartsQuery = useNewOrderPartsQuery({
  params: newOrderPartsParams,
});

const { data: newOrderPartsData, isPending } = useQuery({
  ...newOrderPartsQuery,
  enabled: () => !!newOrderPartsParams.vehicleId,
});

const isLoading = computed(() => !newOrderPartsData.value && !!isPending.value && !!newOrderPartsParams.vehicleId);

const handleClick = async () => {
  if (!newOrderPartsData.value || !newOrderPartsParams.vehicleId) {
    toast.add({
      summary: "Транспорт не выбран",
      severity: "error",
      life: 3000,
    });
  }

  try {
    const result = (await globalBackdropStore.push("list-tree", {
      title: "Выберите",
      props: {
        list: newOrderPartsData.value.content,
        initialValues: modelProxy.value,
      },
    })) as number[];
    modelProxy.value = result;
  } catch (e) {
    console.log(e);
  }
};

const findItem = (id: number): OrderPartsContentChild | null => {
  let foundItem: OrderPartsContentChild | null = null;

  newOrderPartsData.value.content.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (id === child.id) {
          foundItem = child;
        }
      });
    }
  });

  return foundItem;
};

const findItems = (ids: number[]) => {
  const foundItems: OrderPartsContentChild[] = [];

  newOrderPartsData.value.content.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (ids.includes(child.id)) {
          foundItems.push(child);
        }
      });
    }
  });

  return foundItems;
};

const handleChange = async (id: number) => {
  const item = findItem(id);
  if (!item) return;

  try {
    const result = (await globalBackdropStore.push("quantity", {
      title: "Редактирование кол-во",
      props: {
        initialValue: item.quantity,
      },
    })) as number;

    model.value.forEach((item) => {
      if (item.id === id) {
        item.quantity = result;
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const handleRemove = (id: number) => {
  modelProxy.value = modelProxy.value.filter((item) => item !== id);
};

const countOfWorks = computed(() => (model.value.length ? `(${model.value.length})` : ""));
const isDisabled = computed(() => props.disabled || props.field.disabled || isLoading.value);

const totalSum = computed(() => model.value.reduce((acc, curr) => (acc += Number(curr.price)), 0));

watch(
  () => props.stepModel[DEPENDENCY_FIELD_KEY],
  (value) => {
    if (value && value?.id) {
      newOrderPartsParams.vehicleId = String(value.id);
    }
  },
);

watch(newOrderPartsData, (value) => {
  if (value) {
    model.value = findItems(modelProxy.value);
  }
});
</script>

<template>
  <div class="works-list">
    <div class="works-list__title">{{ $t(field.value) }} {{ countOfWorks }}</div>
    <ion-button
      v-if="!disabled"
      class="works-list__button-select"
      fill="outline"
      :disabled="isDisabled"
      @click="handleClick"
    >
      <ion-spinner v-if="isLoading" name="circular" class="works-list__spinner" />
      <span v-else>Выбрать</span>
    </ion-button>
    <div v-if="model.length" class="works-list__selected">
      <SelectedWork
        v-for="item in model"
        :key="item.id"
        :item="item"
        :disabled="isDisabled"
        class="works-list__selected-item"
        @change="handleChange(item.id)"
        @delete="handleRemove(item.id)"
      />
    </div>
    <div v-if="totalSum" class="works-list__total">
      <span class="works-list__total-bold">Итого: {{ totalSum }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.works-list {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__title {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &__button-select {
    width: 100%;
  }

  &__spinner {
    height: 20px;
  }

  &__selected {
    height: 100%;
    max-height: 440px;
    overflow: auto;
    margin-top: 16px;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    &-item {
      box-shadow: 0px 2px 3px 0px #0000001a;
      border: 1px solid var(--System-Gray-Light, #f2f2f7);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__total {
    text-align: right;
    margin-top: 8px;

    &-bold {
      font-weight: 600;
    }
  }
}
</style>
