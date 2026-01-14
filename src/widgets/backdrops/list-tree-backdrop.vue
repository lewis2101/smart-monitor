<script setup lang="ts">
import AccordionTree from "@/components/accordion-tree/accordion-tree.vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import { computed, ref } from "vue";
import { IonButton } from "@ionic/vue";

type AccordionTreeList = InstanceType<typeof AccordionTree>["$props"]["list"];

const props = defineProps<
  {
    list: AccordionTreeList;
    initialValues: number[];
  } & BackdropComponentProps<(value: number[]) => void, (error: Error) => void>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const selectedItems = ref<number[]>(props.initialValues);

const paddingBottom = computed(() => (!!selectedItems.value.length ? "65px" : "0"));

const handleSave = () => {
  if (selectedItems.value.length) {
    props?.onSuccess?.(selectedItems.value);
    emit("closeBackdrop");
  }
};
</script>

<template>
  <div class="list-tree-backdrop">
    <accordion-tree v-model="selectedItems" :list="list" show-search />
    <ion-button v-if="selectedItems.length" class="list-tree-backdrop__button" @click="handleSave">
      Сохранить
    </ion-button>
  </div>
</template>

<style scoped lang="scss">
.list-tree-backdrop {
  position: relative;
  padding-bottom: v-bind(paddingBottom);

  &__button {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    padding: 8px 16px;
  }
}
</style>
