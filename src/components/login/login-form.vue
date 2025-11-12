<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";

defineEmits<{
  (e: "submit"): void;
}>();

const login = defineModel<string>("login", { required: true });
const password = defineModel<string>("password", { required: true });
</script>

<template>
  <form class="login-form" @submit="$emit('submit')">
    <base-input v-model="login" class="login-form__field" placeholder="Логин" />
    <base-input v-model="password" class="login-form__field" placeholder="Пароль" />
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
