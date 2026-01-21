<script setup lang="ts">
import SelectInput from "@/widgets/select-input.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const list = [
  {
    label: "Русский",
    value: "rus",
  },
  {
    label: "Казахский",
    value: "kaz",
  },
  {
    label: "English",
    value: "eng",
  },
];
</script>

<template>
  <select-input placeholder="Язык" :list="list" v-model="locale" />
</template>

<style scoped lang="scss"></style>
