<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    color?: string;
    width?: number;
    height?: number;
  }>(),
  {
    width: 24,
  },
);

const iconsImport = import.meta.glob("@/assets/icons/**/**.svg", { as: "raw" });
const icon = ref<string | null>(null);
const path = "/src/assets/icons/";

const getIcon = async () => {
  try {
    const iconPromise = iconsImport[`${path}${props.name}.svg`];
    if (iconPromise) {
      icon.value = await iconPromise();
    }
  } catch (e) {
    console.error("Failed to load icon", e);
  }
};

onMounted(async () => {
  await getIcon();
});

const getWidth = computed(() => `${props.width}px`);
</script>

<template>
  <span v-html="icon" class="base-icon"></span>
</template>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: v-bind("props.color");
  width: v-bind(getWidth);
}
</style>
