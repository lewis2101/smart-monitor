<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { IonSkeletonText, useIonRouter } from "@ionic/vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { computed } from "vue";

withDefaults(
  defineProps<{
    title: string;
    close?: boolean;
    info?: boolean;
    loading?: boolean;
    hideBack?: boolean;
    hideClose?: boolean;
    variant?: "primary" | "secondary";
  }>(),
  {
    info: false,
    loading: false,
    hideBack: false,
    hideClose: false,
    variant: "primary",
  },
);

const router = useIonRouter();
const canGoBack = computed(() => router.canGoBack());
</script>

<template>
  <div :class="['default-layout-header', `default-layout-header__${variant}`]">
    <div class="default-layout-header__content">
      <div class="default-layout-header__left">
        <slot name="left">
          <base-icon
            v-if="canGoBack && !hideBack"
            class="default-layout-header__icon"
            name="arrow-back"
            @click="() => router.back()"
          />
        </slot>
      </div>
      <div v-if="loading" class="default-layout-header__skeleton">
        <ion-skeleton-text class="default-layout-header__skeleton_item" />
      </div>
      <div v-else class="default-layout-header__title">
        {{ title }}
      </div>
      <div class="default-layout-header__right">
        <slot name="append-right" />
        <slot name="right">
          <base-icon
            v-if="!canGoBack && !hideClose"
            class="default-layout-header__close"
            name="close"
            @click="() => router.replace({ name: MainTabRoutes.home })"
          />
          <div v-else-if="info" class="default-layout-header__help">
            <base-icon name="help" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout-header {
  padding-top: env(safe-area-inset-top);

  &__primary {
    background: $opacity-main;
    color: $white;
  }

  &__secondary {
    background: $white;
    color: $black;
  }

  &__content {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 16px 14px;
  }

  &__left {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);

    flex-shrink: 0;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    text-align: center;
    flex-grow: 1;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    max-width: calc(100% - 56px);
  }

  &__skeleton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &_item {
      width: 50%;
      height: 16px;
      border-radius: 12px;
    }
  }

  &__right {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__help {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;

    border-radius: 4px;
    background-color: $gray-light;
  }
}
</style>
