<script setup lang="ts">
import { IonPage, IonHeader, useIonRouter, IonFooter, IonButton, IonToolbar } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import RegistrationForm from "@/components/registration/registration-form/registration-form.vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const router = useIonRouter();

const model = reactive({
  fio: "",
  job: "",
  phone: "",
  email: "",
  filial: "",
});
</script>

<template>
  <ion-page class="registration-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Регистрация" back @click-back="router.back" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <div class="registration-page__body">
        <registration-form
          v-model:fio="model.fio"
          v-model:job="model.job"
          v-model:phone="model.phone"
          v-model:email="model.email"
          v-model:filial="model.filial"
        />
      </div>
    </base-content-with-refresher>
    <ion-footer v-if="!isVisibleKeyboard">
      <ion-toolbar class="registration-page__buttons">
        <ion-button class="registration-page__button">Зарегистрироваться</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.registration-page {
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
