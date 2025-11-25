<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, IonButton, IonToolbar } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import LoginForm from "@/components/login/login-form/login-form.vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import { useLogin } from "@/composables/login/use-login.ts";

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const { auth, errors, isPending } = useLogin();
</script>

<template>
  <ion-page class="login-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Авторизация" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="login-page__body">
        <login-form :errors="errors" :loading="isPending" @submit="auth" />
      </div>
    </base-content-with-refresher>
    <ion-footer v-if="!isVisibleKeyboard">
      <ion-toolbar class="login-page__buttons">
        <ion-button class="login-page__button" @click="auth" :disabled="isPending">Войти</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.login-page {
  &__body {
    padding: 16px;
  }

  &__buttons {
    --background: $white;
    background: $white;
    --border-width: 0 !important;
    width: 100%;
    padding: 0 24px;
  }

  &__button {
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
