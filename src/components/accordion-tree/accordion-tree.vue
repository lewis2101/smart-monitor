<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Checkbox from "primevue/checkbox";
import BaseInput from "@/components/base/base-input/base-input.vue";
import { computed, ref } from "vue";

type AccordionTree = {
  name: string;
  id: number;
  children?: {
    id: number;
    name: string;
  }[];
};

const props = withDefaults(
  defineProps<{
    list: AccordionTree[];
    showSearch?: boolean;
  }>(),
  {
    showSearch: false,
  },
);

const model = defineModel<number[]>({ required: true });
const searchModel = ref("");

const accordionTopSticky = computed(() => (props.showSearch ? "60px" : "0"));
</script>

<template>
  <div class="accordion-tree">
    <base-input v-if="showSearch" v-model="searchModel" placeholder="Поиск" class="accordion-tree__search" />
    <Accordion lazy>
      <AccordionPanel v-for="item in list" :key="item.id" :value="item.id">
        <AccordionHeader class="accordion-tree__header">{{ item.name }}</AccordionHeader>
        <AccordionContent>
          <template v-if="item.children">
            <label v-for="child in item.children" :key="child.id" class="accordion-tree__item">
              <Checkbox v-model="model" :value="child.id" class="accordion-tree__checkbox" />
              {{ child.name }}
            </label>
          </template>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<style scoped lang="scss">
.accordion-tree {
  padding: 8px 16px 0 16px;
  position: relative;

  &__search {
    position: sticky;
    top: 8px;
    z-index: 2;
    background: $white;
  }

  &__header {
    position: sticky !important;
    top: v-bind(accordionTopSticky) !important;
    z-index: 1 !important;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 4px;
  }

  &__checkbox {
    --p-checkbox-checked-hover-border-color: #{$main-color};
    --p-checkbox-checked-hover-background: #{$main-color};
    --p-checkbox-checked-border-color: #{$main-color};
    --p-checkbox-checked-background: #{$main-color};
  }
}
</style>
