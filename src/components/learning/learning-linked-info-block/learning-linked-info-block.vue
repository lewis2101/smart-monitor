<script setup lang="ts">
import LinkedInfoBlock from "@/widgets/linked-info-block.vue";

type ListType = InstanceType<typeof LinkedInfoBlock>["$props"]["list"];

const learningList: ListType = [
  {
    title: "Вводный курс по охране труда и промышленной безопасности",
    icon: "checklist",
    list: [
      {
        text: "Основы охраны труда, права и обязанности работников",
        marked: true,
      },
      {
        text: "Нормативные акты РК и международные стандарты (ISO, OSHA)",
        marked: true,
      },
      {
        text: "Культура безопасности",
        marked: true,
      },
    ],
  },
  {
    title: "Безопасность при работе на высоте",
    icon: "checklist",
    list: [
      {
        text: "Использование страховочных систем",
        marked: true,
      },
      {
        text: "Организация безопасных рабочих мест на буровых и промыслах",
        marked: true,
      },
    ],
  },
  {
    title: "Пожарная безопасность и противопожарная подготовка",
    icon: "checklist",
    list: [
      {
        text: "Классы пожаров и средства тушения",
        marked: true,
      },
      {
        text: "Действия персонала при возгорании на производственных объектах",
        marked: true,
      },
    ],
  },
  {
    title: "Электробезопасность в нефтегазовой отрасли",
    icon: "checklist",
    list: [
      {
        text: "Работа с электрооборудованием на буровых и перерабатывающих установках",
        marked: true,
      },
      {
        text: "Первая помощь при поражении электрическим током",
        marked: true,
      },
    ],
  },
  {
    title: "Охрана труда при эксплуатации буровых установок и трубопроводов",
    icon: "checklist",
    list: [
      {
        text: "Риски при бурении и транспортировке нефти и газа",
        marked: true,
      },
      {
        text: "Организация безопасного рабочего процесса",
        marked: true,
      },
    ],
  },
];
</script>

<template>
  <linked-info-block :list="learningList" />
</template>

<style scoped></style>
