<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useAuthStorage } from "@/composables/login/use-auth-storage.ts";
import { useLogin } from "@/composables/login/use-login.ts";

const { userInfoStorage } = useAuthStorage();
const { logout } = useLogin();
</script>

<template>
  <ion-page class="profile-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Мои заявки" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="profile-page__body">
        <div>FIRST NAME: {{ userInfoStorage.firstName }}</div>
        <div>LAST NAME: {{ userInfoStorage.lastName }}</div>
        <div>ID: {{ userInfoStorage.id }}</div>
        <div>ROLE: {{ userInfoStorage.role }}</div>
        <ion-button @click="logout">logout</ion-button>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  &__body {
    padding: 16px 8px;
  }
}
</style>
