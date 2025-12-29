<script setup lang="ts">
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useIonRouter } from "@ionic/vue";

type BaseRectItemProps = InstanceType<typeof BaseRectItem>["$props"];

defineProps<{
  list: Array<{
    title: string;
    description: string;
    rectColor: BaseRectItemProps["rectColor"];
    orientation: BaseRectItemProps["orientation"];
    to?: string;
    icon?: string;
  }>;
}>();

const router = useIonRouter();

const handleClick = (to?: string) => to && router.push(to);
</script>

<template>
  <base-island-block>
    <base-rect-item
      v-for="item in list"
      :key="item.title"
      :title="item.title"
      :description="item.description"
      :rect-color="item.rectColor"
      :orientation="item.orientation"
      :icon="item.icon"
      @click="handleClick(item.to)"
    />
  </base-island-block>
</template>

<style scoped></style>
