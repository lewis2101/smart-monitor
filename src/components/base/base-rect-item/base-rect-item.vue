<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

type Orientation = "horizontal" | "vertical";
type RectColor = "light" | "dark";

const props = withDefaults(
  defineProps<{
    rectColor?: RectColor;
    title: string;
    description?: string;
    orientation?: Orientation;
    icon?: string;
  }>(),
  {
    rectColor: "light",
    orientation: "vertical",
  },
);
// 625B71
const rectangleColor = computed(() => props.rectColor === "light" ? "#FFFFFF" : "#143b88");
const direction = computed(() => (props.orientation === "horizontal" ? "row" : "column"));
const gap = computed(() => (props.orientation === "horizontal" ? "8px" : "2px"));
const iconColor = computed(() => (props.rectColor === "light" ? "#2A61CC" : "#FFFFFF"));
const isHorizontal = computed(() => props.orientation === "horizontal");
</script>

<template>
  <div class="base-rect-item">
    <div class="base-rect-item__rect">
      <base-icon v-if="icon" :name="icon" class="base-rect-item__icon" />
    </div>
    <div class="base-rect-item__content">
      <div :class="isHorizontal ? 'base-rect-item__horizontal-title' : 'base-rect-item__vertical-title'">{{ title }}</div>
      <div v-if="isHorizontal && description" class="base-rect-item__description">{{ description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-rect-item {
  display: flex;
  flex-direction: v-bind("direction");
  align-items: center;
  gap: v-bind("gap");

  &__rect {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: v-bind("rectangleColor");
    margin-bottom: 4px;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    color: v-bind("iconColor");
  }

  &__vertical-title {
    font-size: 11px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;
  }

  &__horizontal-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;
  }

  &__description {
    margin-top: 8px;
    font-size: 11px;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0;
  }
}
</style>
