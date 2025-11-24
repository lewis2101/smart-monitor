<script setup lang="ts">
import { IonPage, IonHeader, IonFooter, useIonRouter, IonButton, IonToolbar } from "@ionic/vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import LoginForm from "@/components/login/login-form/login-form.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import { useGlobalSpinner } from "@/stores/use-global-spinner/use-global-spinner.ts";
import { useAuthMutation } from "@/composables/api/auth/login.post.ts";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";
import { useAuthChallengeMutation } from "@/composables/api/auth/challenge.post.ts";
import DeviceDetector from "device-detector-js";
import { computed } from "vue";

const loginSchema = toTypedSchema(
  object({
    username: string().min(1, "Введите Логин").uppercase("Логин должен быть в верхнем регистре"),
    password: string().min(1, "Введите пароль"),
  }),
);

const router = useIonRouter();

const globalSpinner = useGlobalSpinner();

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const { mutateAsync: mutateLogin, isPending } = useAuthMutation({
  onSuccess: () => router.replace({ name: MainTabRoutes.home }),
});

const { mutateAsync: mutateLoginChallenge } = useAuthChallengeMutation({
  onError: (error: Error) => {
    throw error;
  },
});

const { values, validate, errors } = useForm<{
  username: string;
  password: string;
}>({
  validationSchema: loginSchema,
  initialValues: {
    username: "",
    password: "",
  },
});

const device = computed(() => {
  const deviceDetector = new DeviceDetector();
  return deviceDetector.parse(navigator.userAgent);
});

const handleAuth = async () => {
  const { valid } = await validate();
  if (!valid && isPending.value) return;

  await globalSpinner.execute(async () => {
    await mutateLoginChallenge({
      userName: values.username,
      device: device.value,
    });
    await globalSpinner.execute(() =>
      mutateLogin({
        ...values,
        device: device.value,
      }),
    );
  });
};
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
        <login-form :errors="errors" :loading="isPending" @submit="handleAuth" />
      </div>
    </base-content-with-refresher>
    <ion-footer v-if="!isVisibleKeyboard">
      <ion-toolbar class="login-page__buttons">
        <ion-button class="login-page__button" @click="handleAuth" :disabled="isPending">Войти</ion-button>
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
