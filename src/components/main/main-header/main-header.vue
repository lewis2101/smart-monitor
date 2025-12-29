<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useIonRouter } from "@ionic/vue";
import { CommonRoutes } from "@/router/router-list.ts";
import { onMounted, useTemplateRef } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const router = useIonRouter();

const { userInfoStorage } = useAuthStorage();

const userInfoRef = useTemplateRef("userInfoRef");

onMounted(() => {
  useBubbleAnimate(userInfoRef);
});
</script>

<template>
  <header class="main-header">
    <div ref="userInfoRef" class="main-header__user" @click="router.push({ name: CommonRoutes.profile })">
      <button class="main-header__button">
        <base-icon name="user" color="white" />
      </button>
      <span>{{ userInfoStorage.firstName }} {{ userInfoStorage.lastName }}</span>
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
  padding: calc(16px + env(safe-area-inset-top)) 16px 16px 16px;
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
