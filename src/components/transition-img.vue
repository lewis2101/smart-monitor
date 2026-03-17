<script setup lang="ts">
import { ref, useAttrs, onMounted } from "vue";

const attrs = useAttrs();

const imgRef = ref<HTMLImageElement | null>(null);
const loaded = ref(false);
const skipAnimation = ref(false);

function onLoad(e: Event) {
  loaded.value = true;

  if (typeof attrs.onLoad === "function") {
    attrs.onLoad(e);
  }
}

onMounted(() => {
  const img = imgRef.value;

  if (img?.complete) {
    skipAnimation.value = true;
    loaded.value = true;
  }
});
</script>

<template>
  <img
    ref="imgRef"
    v-bind="attrs"
    :class="[attrs.class, 'transition-img', { loaded, 'no-animation': skipAnimation }]"
    @load="onLoad"
  />
</template>

<style scoped lang="scss">
.transition-img {
  opacity: 0;
  transition: opacity 0.35s ease;
}

.transition-img.loaded {
  opacity: 1;
}

.transition-img.no-animation {
  transition: none;
}
</style>
