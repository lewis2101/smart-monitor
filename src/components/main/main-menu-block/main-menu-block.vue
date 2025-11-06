<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
</script>

<template>
  <base-island-block>
    <base-rect-item
      title="Минутки безопасности"
      description="Что делать при обнаружении утечки газа"
      rect-color="dark"
      orientation="horizontal"
    />
    <base-rect-item
      title="Заявки на согласование"
      description="Электронные заявки на проведение опасных работ, наряды-допуски и согласование инструктажей"
      rect-color="dark"
      orientation="horizontal"
    />
    <base-rect-item
      title="Обучения"
      description="Курс «Работа на высоте»"
      rect-color="dark"
      orientation="horizontal"
    />
    <base-rect-item
      title="Молнии"
      description="Внимание!!! Эвакуация с объекта!!!"
      rect-color="dark"
      orientation="horizontal"
    />
    <base-rect-item
      title="Ещё"
      description="Локальные инструкции предприятия"
      rect-color="dark"
      orientation="horizontal"
    />
  </base-island-block>
</template>

<style scoped>

</style>
