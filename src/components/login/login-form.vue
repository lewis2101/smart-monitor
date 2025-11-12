<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import BaseInput from "@/components/base/base-input/base-input.vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";

const keyboardStore = useKeyboardStore();
const { isVisibleKeyboard } = storeToRefs(keyboardStore);

const login = defineModel<string>("login", { required: true });
const password = defineModel<string>("password", { required: true });
</script>

<template>
  <form class="login-form">
    <base-input v-model="login" class="login-form__field" placeholder="Логин" />
    <base-input v-model="password" class="login-form__field" placeholder="Пароль" />
    <teleport v-if="!isVisibleKeyboard" to="body">
      <div class="login-form__submit">
        <ion-button fill="clear" class="login-form__button">Зарегистрироваться</ion-button>
        <ion-button class="login-form__button">Войти</ion-button>
      </div>
    </teleport>
  </form>
</template>

<style scoped lang="scss">
.login-form {

  &__field {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__submit {
    position: fixed;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    right: 0;
    padding: 8px 16px;
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
