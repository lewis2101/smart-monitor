<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import BaseSelect from "@/components/base/base-select/base-select.vue";

type SelectList = InstanceType<typeof BaseSelect>["$props"]["list"];

const fio = defineModel<string>("fio", { required: true });
const job = defineModel<string>("job", { required: true });
const phone = defineModel<string>("phone", { required: true });
const email = defineModel<string>("email", { required: true });
const filial = defineModel<string>("filial", { required: true });

const jobs: SelectList = [
  {
    label: "Рабочий",
    value: "shared",
  },
  {
    label: "Мастер",
    value: "master",
  },
  {
    label: "Инженер по ТБ",
    value: "tb",
  },
  {
    label: "Администратор",
    value: "admin",
  },
];
</script>

<template>
  <div class="registration-form">
    <base-input v-model="fio" class="registration-form__field" placeholder="ФИО" />
    <base-select
      v-model="job"
      class="registration-form__field"
      placeholder="Должность"
      select-title="Выберите должность"
      :list="jobs"
    />
    <base-input v-model="phone" class="registration-form__field" placeholder="Номер телефона" />
    <base-input v-model="email" class="registration-form__field" placeholder="Email" />
    <base-select
      v-model="filial"
      class="registration-form__field"
      placeholder="Цех/Отдел"
      select-title="Выберите Цех/Отдел"
      :list="jobs"
    />
  </div>
</template>

<style scoped lang="scss">
.registration-form {
  &__field {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
