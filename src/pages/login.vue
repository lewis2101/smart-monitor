<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import LoginForm from "@/components/login/login-form.vue";
import { reactive } from "vue";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";

const { setSecondaryColor } = useStatusBarColor();
setSecondaryColor();

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
  </ion-page>
</template>

<style scoped lang="scss">
.login-page {
  padding-top: env(safe-area-inset-top);

  &__body {
    padding: 16px;
  }
}
</style>
