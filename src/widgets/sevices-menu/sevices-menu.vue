<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useServicesMenu } from "@/widgets/sevices-menu/useServicesMenu.ts";

const { permittedMenuList } = useServicesMenu();

await mockDelayPromise();
</script>

<template>
  <base-island-block class="services-menu" title="Все разделы" :clickable="false" :shadow="false">
    <div class="services-menu__wrapper">
      <base-island-block
        v-for="item in permittedMenuList"
        :key="item.title"
        class="services-menu__item-wrapper"
        @click="item?.action"
      >
        <div class="services-menu__item">
          <div :class="['services-menu__icon', item.color]">
            <base-icon :name="item.icon" />
          </div>
          <div class="services-menu__title">{{ item.title }}</div>
        </div>
      </base-island-block>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.services-menu {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  &__item-wrapper {
    justify-content: space-between;
  }

  &__item {
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 8px;

    .green {
      background: #d0fae5;
      color: #009966;
    }

    .blue {
      background: #dbeafe;
      color: #155dfc;
    }

    .light-blue {
      background: #cefafe;
      color: #0092b8;
    }

    .purple {
      background: #f3e8ff;
      color: #9810fa;
    }

    .red {
      background: #ffe4e6;
      color: #ec003f;
    }

    .yellow {
      background: #fef3c6;
      color: #e17100;
    }

    .orange {
      background: #ffedd4;
      color: #f54a00;
    }
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
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
