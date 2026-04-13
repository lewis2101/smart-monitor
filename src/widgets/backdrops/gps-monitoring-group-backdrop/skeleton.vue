<script setup lang="ts">
</script>

<template>
  <div class="gps-monitoring-group-backdrop">
    <div v-for="i in 6" :key="i" class="gps-monitoring-group-backdrop__item">
      <ion-skeleton-text animated />
      <ion-skeleton-text animated />
      <ion-skeleton-text animated />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gps-monitoring-group-backdrop {
  padding: 16px 16px calc(8px + env(safe-area-inset-bottom)) 16px;

  ion-skeleton-text {
    width: 100%;
    height: 24px;
    border-radius: 24px;

    &:first-child {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 12px;
    }

    &:last-child {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border-radius: 50%;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 8px;
    margin-bottom: 16px
  }
}
</style>
