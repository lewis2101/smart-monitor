<script setup lang="ts">
import MainHeader from "@/components/main/main-header/main-header.vue";
</script>

<template>
  <div class="main-layout-header">
    <div class="main-layout-header__content">
      <main-header />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout-header {
  position: relative;

  &__content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #041a4b;
  }
}
</style>
