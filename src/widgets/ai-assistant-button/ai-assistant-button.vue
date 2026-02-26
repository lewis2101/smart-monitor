<script setup lang="ts">
import { CommonRoutes } from "@/router/router-list.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useIonRouter } from "@ionic/vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

const router = useIonRouter();

await mockDelayPromise();
</script>

<template>
  <base-island-block @click="router.push({ name: CommonRoutes.aiChat })">
    <div class="ai-assistant__wrapper">
      <div class="ai-assistant__icon">
        <base-icon name="robot" />
      </div>
      <div class="ai-assistant__title">ИИ Ассистент</div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.ai-assistant {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    background: $secondary-color;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: $white;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
