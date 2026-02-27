<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, IonButton, IonToolbar, useIonRouter } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import LoginForm from "@/components/login/login-form/login-form.vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import { useLogin } from "@/composables/login/use-login.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { ref, watch } from "vue";
import { MainTabRoutes } from "@/router/router-list.ts";

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const { auth, errors, isPending } = useLogin();

const router = useIonRouter();

const clicked = ref(0);
let timeout: ReturnType<typeof setTimeout> | undefined;

const handleClick = () => {
  clicked.value++;

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    clicked.value = 0;
  }, 3000);
};

watch(clicked, (value) => {
  if (value === 5) {
    router.replace({
      name: MainTabRoutes.home,
    });
  }
});
</script>

<template>
  <ion-page class="login-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Авторизация" hide-close hide-back>
          <template #right>
            <base-icon name="help" @click="handleClick" />
          </template>
        </default-layout-header>
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <login-form :errors="errors" :loading="isPending" @submit="auth" />
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
