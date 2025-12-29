<script setup lang="ts">
import MenuBlock from "@/widgets/menu-block.vue";

type listType = InstanceType<typeof MenuBlock>["$props"]["list"];

const mainList: listType = [
  {
    title: "Минутки безопасности",
    description: "Что делать при обнаружении утечки газа",
    rectColor: "dark",
    orientation: "horizontal",
    icon: "security",
  },
  {
    title: "Заявки на согласование",
    description: "Электронные заявки на проведение опасных работ, наряды-допуски и согласование инструктажей",
    rectColor: "dark",
    orientation: "horizontal",
    icon: "decision",
  },
  {
    title: "Обучения",
    description: "Курс «Работа на высоте»",
    rectColor: "dark",
    orientation: "horizontal",
    icon: "puzzle",
    to: "/learning",
  },
  {
    title: "Молнии",
    description: "Внимание!!! Эвакуация с объекта!!!",
    rectColor: "dark",
    orientation: "horizontal",
    icon: "warning",
  },
  {
    title: "Ещё",
    description: "Локальные инструкции предприятия",
    rectColor: "dark",
    orientation: "horizontal",
    icon: "more",
    to: "/briefing",
  },
];
</script>

<template>
  <menu-block :list="mainList" />
</template>

<style scoped></style>
