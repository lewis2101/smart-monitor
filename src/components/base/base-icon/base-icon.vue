<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  name: string;
  color?: string;
}>();

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
}
</style>
