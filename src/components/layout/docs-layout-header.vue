<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
</script>

<template>
  <div class="docs-layout-header">
    <base-icon name="arrow-back" />
    <div class="docs-layout-header__title">Ваши документы</div>
    <div class="docs-layout-header__help">
      <base-icon name="help" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.docs-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: $white;

  padding: 12px 16px;

  &__title {
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
  }

  &__help {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;

    border-radius: 4px;
    background-color: $gray-light;
  }
}
</style>
