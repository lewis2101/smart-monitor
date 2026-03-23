<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <base-island-block class="ai-chat-list" skeleton-title :shadow="false" :clickable="false">
    <base-island-block v-for="i in 4" :key="i" class="ai-chat-list__item" :clickable="false">
      <div class="ai-chat-list__item-title">
        <ion-skeleton-text animated />
      </div>
      <div class="ai-chat-list__item-content">
        <ion-skeleton-text v-for="i in 3" :key="i" animated />
      </div>
    </base-island-block>

    <ion-button>
      <ion-skeleton-text animated />
    </ion-button>
  </base-island-block>
</template>

<style scoped lang="scss">
.ai-chat-list {
  &__item {
    padding: 20px;
  }

  &__item-title {
    font-weight: bold;
    font-size: 14px;

    ion-skeleton-text {
      width: 100px;
      height: 16px;
      border-radius: 24px;
    }
  }

  &__item-content {
    padding: 0 8px;

    ion-skeleton-text {
      height: 14px;
      border-radius: 24px;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }

  }

  &__item-role {
    font-weight: bold;
    font-size: 14px;
    color: $black;
  }

  ion-button {
    ion-skeleton-text {
      width: 200px;
      height: 16px;
      border-radius: 24px;
    }
  }
}
</style>
