<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";
import { IonSkeletonText } from "@ionic/vue";

type Radius = "S" | "M" | "L" | "XL";
type RadiusOrient = "top" | "bottom" | "left" | "right" | "all" | "none";

const radiusMapper: Record<Radius, number> = {
  S: 12,
  M: 24,
  L: 36,
  XL: 48,
};

const radiusOrientMapper: Record<RadiusOrient, (radius: string) => string> = {
  top: (radius) => `${radius} ${radius} 0 0`,
  bottom: (radius) => `0 0 ${radius} ${radius}`,
  left: (radius) => `${radius} 0 0 ${radius}`,
  right: (radius) => `0 ${radius} ${radius} 0`,
  all: (radius) => `${radius}`,
  none: () => `none`,
};

const props = withDefaults(
  defineProps<{
    title?: string;
    rounded?: Radius;
    roundedOrient?: RadiusOrient;
    clickable?: boolean;
    shadow?: boolean;
    skeletonTitle?: boolean;
  }>(),
  {
    rounded: "M",
    roundedOrient: "all",
    clickable: true,
    shadow: true,
    skeletonTitle: false,
  },
);

const islandBlockRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (props.clickable) {
    useBubbleAnimate(islandBlockRef);
  }
});

const radiusPx = computed(() => `${radiusMapper[props.rounded]}px`);
const radius = computed(() => radiusOrientMapper[props.roundedOrient](radiusPx.value));
const boxShadow = computed(() => (props.shadow ? `0 0 24px 0 #00000014` : "none"));
</script>

<template>
  <div :class="['base-island-block']" ref="islandBlockRef">
    <ion-skeleton-text v-if="skeletonTitle" animated />
    <div v-else-if="title || $slots['top-right']" class="base-island-block__header">
      <span v-if="title" class="base-island-block__title">{{ title }}</span>
      <slot name="top-right" />
    </div>
    <div class="base-island-block__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-island-block {
  padding: 12px;
  border-radius: v-bind("radius");
  background: $white;
  box-shadow: v-bind(boxShadow);
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  ion-skeleton-text {
    width: 150px;
    height: 20px;
    border-radius: 24px;
    padding: 4px;
    margin-bottom: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 4px;
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    padding: 0 4px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &-clickable {
    &:active {
      background: #f4f4f4;
    }
  }
}
</style>
