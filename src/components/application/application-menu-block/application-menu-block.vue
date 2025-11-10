<script setup lang="ts">
import MenuBlock from "@/widgets/menu-block.vue";

type listType = InstanceType<typeof MenuBlock>["$props"]["list"];

const applicationList: listType = [
  {
    title: "Мои заявки",
    description: "Список поданных сообщений и их текущий статус",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Черновики",
    description: "Заявки, которые вы ещё не отправили",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "История и архив",
    description: "Закрытые нарушения и отчёты об устранении",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Обратная связь",
    description: "Вопросы и комментарии по вашим заявкам",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Инструкции и помощь",
    description: "Как правильно заполнить заявку и примеры типовых нарушений",
    rectColor: "dark",
    orientation: "horizontal",
  },
  {
    title: "Сообщить о нарушении",
    description: "Быстрая подача новой заявки с фото или видео",
    rectColor: "dark",
    orientation: "horizontal",
  },
];
</script>

<template>
  <menu-block :list="applicationList" />
</template>

<style scoped>

</style>
