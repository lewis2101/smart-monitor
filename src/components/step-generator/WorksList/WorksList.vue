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

const model = defineModel<number[]>({ required: true, default: () => [] });

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
        initialValues: model.value,
      },
    })) as number[];
    model.value = result;
  } catch (e) {
    console.log(e);
  }
};

const handleRemove = (id: number) => {
  model.value = model.value.filter((item) => item !== id);
};

const selectedWorksList = computed(() => {
  if (!newOrderPartsData.value) return [];

  const selectedItems: OrderPartsContentChild[] = [];

  newOrderPartsData.value.content.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (model.value.includes(child.id)) {
          selectedItems.push(child);
        }
      });
    }
  });
  return selectedItems;
});

watch(
  () => props.stepModel[DEPENDENCY_FIELD_KEY],
  (value) => {
    if (value && value?.id) {
      newOrderPartsParams.vehicleId = String(value.id);
    }
  },
);
</script>

<template>
  <div class="works-list">
    <div class="works-list__title">{{ $t(field.value) }}</div>
    <ion-button
      class="works-list__button-select"
      fill="outline"
      :disabled="disabled || field.disabled || isLoading"
      @click="handleClick"
    >
      <ion-spinner v-if="isLoading" name="circular" class="works-list__spinner" />
      <span v-else>Выбрать</span>
    </ion-button>
    <div v-if="selectedWorksList.length" class="works-list__selected">
      <SelectedWork
        v-for="item in selectedWorksList"
        :key="item.id"
        :item="item"
        class="works-list__selected-item"
        @delete="handleRemove(item.id)"
      />
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
}
</style>
