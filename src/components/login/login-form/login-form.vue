<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import { useField } from "vee-validate";

defineProps<{
  errors: {
    username?: string;
    password?: string;
  };
  loading?: boolean;
}>();

defineEmits<{
  (e: "submit"): void;
}>();

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");
</script>

<template>
  <form class="login-form" @submit="$emit('submit')" @keyup.enter.passive="$emit('submit')">
    <base-input
      v-model="username"
      class="login-form__field"
      placeholder="Логин"
      name="login"
      :error-text="errors.username"
      :disabled="loading"
    />
    <base-input
      v-model="password"
      type="password"
      class="login-form__field"
      placeholder="Пароль"
      name="password"
      :error-text="errors.password"
      :disabled="loading"
    />
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

  &__button {
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
