<script setup lang="ts">
import SelectInput from "@/widgets/select-input.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { locale, t } = useI18n();

const list = computed(() => [
  {
    label: t("lang.rus"),
    value: "rus",
  },
  {
    label: t("lang.kaz"),
    value: "kaz",
  },
  {
    label: t("lang.eng"),
    value: "eng",
  },
]);
</script>

<template>
  <select-input :placeholder="$t('lang.title')" :list="list" v-model="locale" />
</template>

<style scoped lang="scss"></style>
