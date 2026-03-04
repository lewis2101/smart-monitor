<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const globalBackdropStore = useGlobalBackdropStore();

const handleClick = () => {
  globalBackdropStore.push("profile-history", {
    title: "История входа",
    props: {},
  });
};
</script>

<template>
  <base-island-block class="auth-public-key-list-action__wrapper" @click="handleClick">
    <div class="auth-public-key-list-action__content">
      <div class="auth-public-key-list-action__title">История входа</div>
      <div class="auth-public-key-list-action__icon">
        <base-icon name="chevron" />
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.auth-public-key-list-action {
  &__wrapper {
    padding: 20px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-weight: bold;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
