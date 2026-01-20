<script setup lang="ts">
import RadioButton from "primevue/radiobutton";
import { IonButton } from "@ionic/vue";
import { onMounted, ref, watch } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import BaseInput from "@/components/base/base-input/base-input.vue";
import { debounce } from "@/utils/debounce.ts";

type List = {
  label: string;
  description?: string;
  hint?: string[];
  value: number | string;
};

const props = withDefaults(
  defineProps<
    {
      list: Array<List>;
      initialValue: number | string | null;
      showReset?: boolean;
      showSearch?: boolean;
    } & BackdropComponentProps<(value: number | string | null) => any>
  >(),
  {
    showSearch: false,
    showReset: false,
  },
);

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const temporaryModel = ref(props.initialValue);

const isIncludesList = (list: List, text: string) => {
  const lowerText = text.toLowerCase();
  return (
    list.label.toLowerCase().includes(lowerText) ||
    list.description?.toLowerCase()?.includes(lowerText) ||
    list.hint?.some((hint) => hint.toLowerCase().includes(lowerText))
  );
};

const filterDebounce = debounce(() => {
  if (!searchModel.value) {
    filteredList.value = props.list;
  }
  filteredList.value = props.list.filter((item) => isIncludesList(item, searchModel.value));
}, 500);

const searchModel = ref("");
const filteredList = ref(props.list);

const submit = () => {
  if (temporaryModel.value) {
    props.onSuccess?.(temporaryModel.value);
    emit("closeBackdrop");
  }
};

const reset = () => {
  props.onSuccess?.(null);
  emit("closeBackdrop");
};

onMounted(() => {
  if (!temporaryModel.value) return;

  const item = props.list.find((l) => l.value === temporaryModel.value);
  if (!item) return;

  const element = document.getElementById(`${item.label}-${item.value}`);
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

watch(searchModel, () => {
  filterDebounce();
});
</script>

<template>
  <div class="select-input-backdrop">
    <base-input v-if="showSearch && list.length > 10" v-model="searchModel" placeholder="Поиск" class="select-input-backdrop__search" />
    <label
      v-for="(item, idx) in filteredList"
      :key="item.value"
      :for="`${item.value}-${idx}`"
      :id="`${item.label}-${item.value}`"
      class="select-input-backdrop__item"
    >
      <radio-button
        v-model="temporaryModel"
        variant="filled"
        :value="item.value"
        :input-id="`${item.value}-${idx}`"
        class="select-input-backdrop__radio"
      />
      <label :for="`${item.value}-${idx}`">
        <div :class="['select-input-backdrop__label', item.description && 'select-input-backdrop__label-bold']">
          {{ item.label }}
        </div>
        <div v-if="item.description" class="select-input-backdrop__description">
          {{ item.description }}
        </div>
        <div v-for="hint in item.hint" :key="hint" class="select-input-backdrop__hint">
          {{ hint }}
        </div>
      </label>
    </label>
    <div class="select-input-backdrop__button-wrapper">
      <ion-button v-if="showReset" fill="outline" class="select-input-backdrop__button" @click="reset"
        >Сбросить</ion-button
      >
      <ion-button class="select-input-backdrop__button" @click="submit">Подтвердить</ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-input-backdrop {
  padding: 8px 16px 0 16px;
  scroll-margin-top: 50px;

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 19px 16px;
  }

  &__radio {
    --p-radiobutton-checked-hover-border-color: #{$main-color};
    --p-radiobutton-checked-hover-background: #{$main-color};
    --p-radiobutton-checked-border-color: #{$main-color};
    --p-radiobutton-checked-background: #{$main-color};
  }

  &__button-wrapper {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding-bottom: env(safe-area-inset-bottom);
    background: $white;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__search {
    position: sticky;
    top: 8px;
    background: $white;
    z-index: 1;
  }

  &__button {
    width: 100%;
    margin-top: 8px;
  }

  &__label {
    &-bold {
      font-weight: 600;
    }
  }

  &__description {
    font-size: 14px;
    margin-top: 4px;
  }

  &__hint {
    color: $gray-dark;
    margin-top: 4px;
    font-size: 14px;
  }
}
</style>
