<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
</script>

<template>
  <header class="main-header">
    <div class="main-header__user">
      <button class="main-header__button">
        <base-icon name="user" color="white" />
      </button>
      <span>Нурлан С.</span>
      <button class="main-header__button">
        <base-icon name="chevron" color="white" />
      </button>
    </div>
    <div class="main-header__menu">
      <button class="main-header__button">
        <base-icon name="search" color="white" />
      </button>
      <button class="main-header__button">
        <base-icon name="notification" color="white" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  background: #041a4b;
  color: $white;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__user {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
  }
}
</style>
