<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useIonRouter } from "@ionic/vue";
import { OrderRoutes } from "@/router/router-list.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const router = useIonRouter();

const processList = [
  {
    icon: "auto",
    color: "success",
    title: "Заявка на авто",
    description: "Транспорт",
    action: () => {
      router.push({ name: OrderRoutes.newOrder, params: { processKey: "KT_TAXI_PROCESS" } });
      emit("closeBackdrop");
    },
  },
  {
    icon: "fix",
    color: "warning",
    title: "Ремонт ТС",
    description: "Тех. обслуживание",
    action: () => {
      router.push({ name: OrderRoutes.newOrder, params: { processKey: "LENKRAD_PROCESS" } });
      emit("closeBackdrop");
    },
  },
  {
    icon: "book",
    color: "info",
    title: "Поставка товаров",
    description: "Материалы",
    action: () => {
      router.push({ name: OrderRoutes.newOrder, params: { processKey: "PURCHASE_PROCESS" } });
      emit("closeBackdrop");
    },
  },
  {
    icon: "shield",
    color: "success",
    title: "Наряд допуск",
    description: "Разрешение",
  },
  {
    icon: "history",
    color: "warning",
    title: "ПАБ",
    description: "Аудит поведения",
    action: () => {
      router.push({ name: OrderRoutes.mockOrder, params: { processKey: "PAB" }, query: { mockOrderStep: 1 } });
      emit("closeBackdrop");
    },
  },
  {
    icon: "search",
    color: "info",
    title: "Аудиты",
    description: "Инспекция",
  },
];

await mockDelayPromise();
</script>

<template>
  <div class="process-list-backdrop">
    <base-island-block
      v-for="item in processList"
      :key="item.title"
      class="process-list-backdrop__wrapper"
      @click="item?.action"
    >
      <div class="process-list-backdrop__item">
        <div class="process-list-backdrop__start">
          <div :class="['process-list-backdrop__icon', item.color]">
            <base-icon :name="item.icon" />
          </div>
          <div class="process-list-backdrop__content">
            <div class="process-list-backdrop__title">{{ item.title }}</div>
            <div class="process-list-backdrop__description">{{ item.description }}</div>
          </div>
        </div>
        <div class="process-list-backdrop__end">
          <base-icon name="plus" />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.process-list-backdrop {
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;

  &__wrapper {
    padding: 16px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .success {
      background: $secondary-color;
      color: $white;
    }

    .warning {
      background: #f54a00;
      color: $white;
    }

    .info {
      background: #4f39f6;
      color: $white;
    }
  }

  &__start {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__end {
    width: 32px;
    height: 32px;
    background: $gray-light;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &__icon {
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
  }

  &__description {
    margin-top: 4px;
    font-size: 12px;
    color: $gray-dark;
  }
}
</style>
