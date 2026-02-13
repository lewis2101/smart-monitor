<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <base-island-block title="Быстрый доступ" class="main-express" :clickable="false">
    <div class="main-express__wrapper">
      <div class="main-express__item danger">
        <div class="main-express__icon">
          <base-icon name="phone" />
        </div>
        <div class="main-express__title">Экстренный вызов</div>
      </div>
      <div class="main-express__item warning">
        <div class="main-express__icon">
          <base-icon name="warning" />
        </div>
        <div class="main-express__title">Сообщить об инцеденте</div>
      </div>
      <div class="main-express__item success">
        <div class="main-express__icon">
          <base-icon name="docs" />
        </div>
        <div class="main-express__title">HSE инструкция</div>
      </div>
      <div class="main-express__item info">
        <div class="main-express__icon">
          <base-icon name="notification" />
        </div>
        <div class="main-express__title">Вызвать HSE</div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.main-express {
  padding: 20px;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  &__item {
    padding: 16px;
    color: $white;
    border-radius: 16px;
    min-width: 130px;
    min-height: 130px;
  }

  .danger {
    color: $danger;
    background: #ffe4e6;
  }

  .warning {
    color: #e17100;
    background: #fef3c6;
  }

  .success {
    color: #009966;
    background: #d0fae5;
  }

  .info {
    color: #155dfc;
    background: #dbeafe;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    background: $white;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    margin-bottom: 8px;
    box-shadow: 0 0 24px 0 #00000014;
  }

  &__title {
    color: $black;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
