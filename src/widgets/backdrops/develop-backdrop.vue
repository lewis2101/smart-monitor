<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
</script>

<template>
  <div class="develop-backdrop">
    <div class="develop-backdrop__title">
      <div class="develop-backdrop__icon">
        <base-icon name="setting" />
      </div>
      Страница в разработке
    </div>
  </div>
</template>

<style scoped lang="scss">
.develop-backdrop {
  min-height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    font-size: 18px;
    font-weight: bold;

  }

  &__icon {
    width: 50px;
    height: 50px;
    background: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;

    color: $white;
    border-radius: 50%;
  }
}
</style>
