<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, useIonRouter, IonButton, IonToolbar } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import LoginForm from "@/components/login/login-form.vue";
import { reactive } from "vue";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import { CommonRoutes, MainTabRoutes } from "@/router/router-list.ts";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";

const router = useIonRouter();

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const { setSecondaryColor, initRouteWatch } = useStatusBarColor();
initRouteWatch(() => setSecondaryColor());

const model = reactive({
  login: "",
  password: "",
});
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
        <login-form v-model:login="model.login" v-model:password="model.password" />
      </div>
    </base-content-with-refresher>
    <ion-footer v-if="!isVisibleKeyboard">
      <ion-toolbar class="login-page__buttons">
        <ion-button fill="clear" class="login-page__button" @click="router.push({ name: CommonRoutes.registration })"
          >Зарегистрироваться</ion-button
        >
        <ion-button class="login-page__button" @click="router.replace({ name: MainTabRoutes.home })">Войти</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.login-page {
  padding-top: env(safe-area-inset-top);

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
  }
}
</style>
