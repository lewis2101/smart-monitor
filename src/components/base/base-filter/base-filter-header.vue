<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseBackdrop from "@/components/base/base-backdrop/base-backdrop.vue";
import { computed, ref, watch } from "vue";
import BaseInput from "@/components/base/base-input/base-input.vue";
import { IonButton } from "@ionic/vue";
import type { FieldType } from "../../../../types/FieldType.ts";
import type { FilterType } from "../../../../types/FilterType.ts";

const getInitialValues = (sync = false): Record<string, FilterType> =>
  props.fields.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.value]: {
        operator: "like",
        value: curr.value,
        text: sync ? filterModel.value.find((v) => v.value === curr.value)?.text || "" : "",
      },
    }),
    {},
  );

const props = defineProps<{
  fields: FieldType[];
}>();

const filterModel = defineModel<FilterType[]>("filter", { required: true });
const temporaryModel = ref<Record<string, FilterType>>({});

const currentTitle = ref("");

const filterBackdropModel = ref(false);

const handleClick = (title: string) => {
  currentTitle.value = title;
  filterBackdropModel.value = true;
};

const isActiveFilter = computed(() => filterModel.value.length > 0);

watch(filterBackdropModel, (value) => {
  if (value) {
    temporaryModel.value = getInitialValues(true);
  }
});

const submit = () => {
  filterModel.value.splice(0, filterModel.value.length);

  Object.values(temporaryModel.value).forEach((field) => {
    if (field.text) {
      filterModel.value.push(field);
    }
  });

  filterBackdropModel.value = false;
};

const reset = () => {
  temporaryModel.value = getInitialValues();
};
</script>

<template>
  <div class="base-filter-header">
    <base-island-block
      :class="['base-filter-header__filter', isActiveFilter && 'active']"
      clickable
      @click="handleClick('Фильтр')"
    >
      <div class="base-filter-header__filter-item">
        <base-icon name="filter" :color="isActiveFilter ? '#FFFFFF' : '#2A61CC'" />
        <div>Фильтр</div>
      </div>
    </base-island-block>
    <base-island-block class="base-filter-header__filter" clickable @click="handleClick('Сортировка')">
      <div class="base-filter-header__filter-item">
        <base-icon name="sort" color="#2A61CC" />
        <div>Сортировка</div>
      </div>
    </base-island-block>
    <base-backdrop v-model="filterBackdropModel" :title="currentTitle">
      <div class="base-filter">
        <base-input
          v-for="field in fields"
          v-model="temporaryModel[field.value].text"
          :key="field.value"
          class="base-filter__item"
          :placeholder="field.local?.rus || field.value"
        />
        <div class="base-filter__buttons">
          <ion-button fill="outline" class="base-filter__button" @click="reset">Сбросить</ion-button>
          <ion-button class="base-filter__button" @click="submit">Применить</ion-button>
        </div>
      </div>
    </base-backdrop>
  </div>
</template>

<style scoped lang="scss">
.base-filter-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  .active {
    background: $main-color;
    color: $white;
  }

  &__filter-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 14px;
  }
}

.base-filter {
  padding: 8px 16px 0 16px;

  &__item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__buttons {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 8px 0;
    background: $white;

    margin-top: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__button {
    width: 100%;
  }
}
</style>
