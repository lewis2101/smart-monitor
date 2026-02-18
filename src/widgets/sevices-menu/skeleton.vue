<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block class="services-menu" title="Меню" :clickable="false">
    <div class="services-menu__wrapper">
      <base-island-block v-for="i in 10" :key="i" class="services-menu__item-wrapper">
        <div class="services-menu__item">
          <div :class="['services-menu__icon']">
            <ion-skeleton-text animated />
          </div>
          <div class="services-menu__title">
            <ion-skeleton-text animated />
          </div>
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
    width: 30px;
    border-radius: 12px;
  }
}
</style>
