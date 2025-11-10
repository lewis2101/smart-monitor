<script setup lang="ts">
import MenuBlock from "@/widgets/menu-block.vue";

type listType = InstanceType<typeof MenuBlock>["$props"]["list"];

const briefingList: listType = [
  {
    title: "Минутки безопасности",
    description: "Что делать при обнаружении утечки газа",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Заявки на согласование",
    description: "Электронные заявки на проведение опасных работ, наряды-допуски и согласование инструктажей",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Обучения",
    description: "Курс «Работа на высоте»",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Молнии",
    description: "Внимание!!! Эвакуация с объекта!!!",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Локальные инструкции предприятия",
    description: "Все внутренние регламенты и правила компании в одном месте",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Журнал прохождения инструктажей",
    description: "История ваших инструктажей, экзаменов и обучения",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Контакты служб безопасности и охраны труда",
    description: "Телефоны и e-mail ответственных специалистов",
    rectColor: "dark",
    orientation: "horizontal",
  },
];
</script>

<template>
  <menu-block :list="briefingList" />
</template>

<style scoped>

</style>
