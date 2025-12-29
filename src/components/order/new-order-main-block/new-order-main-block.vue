<script setup lang="ts">
import { onMounted } from "vue";

defineProps<{
  processKey: string;
}>();

const emit = defineEmits<{
  (e: "getLabel", value: string): void;
}>();

onMounted(() => {
  setTimeout(() => {
    emit("getLabel", "Процесс");
  }, 1500);
});
</script>

<template>
  <div class="new-order-main-block">NEW ORDER</div>
</template>

<style scoped lang="scss">
.new-order-main-block {
  width: 100%;
}
</style>
