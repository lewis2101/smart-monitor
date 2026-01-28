<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import { useOrderFileQuery } from "@/api/orders/order-file.ts";
import { useQuery } from "@tanstack/vue-query";
import { IonSkeletonText } from "@ionic/vue";
import { onMounted } from "vue";
import File from "@/components/step-generator/FileField/File.vue";

const props = defineProps<{
  field: StepField;
  orderId: string;
}>();

const orderFileQuery = useOrderFileQuery({
  getUrl: (url) => `${url}/${props.orderId}`,
});

const { data, isPending } = useQuery(orderFileQuery);

onMounted(() => {});
</script>

<template>
  <div class="file-field">
    <div class="file-field__title">Вложенные файлы</div>
    <template v-if="data">
      <file v-for="(file, idx) in data.content" :file="file" :key="idx" class="file-field__item" />
    </template>
    <template v-if="isPending">
      <div v-for="item in 3" :key="item" class="file-field__item">
        <ion-skeleton-text animated class="file-field__skeleton-icon" />
        <ion-skeleton-text animated class="file-field__skeleton-text" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.file-field {
  position: relative;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  padding: 16px;

  &__title {
    font-weight: 600;
    margin-bottom: 16px;
  }

  &__item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__skeleton-icon {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }

  &__skeleton-text {
    width: 100%;
    height: 25px;
  }
}
</style>
