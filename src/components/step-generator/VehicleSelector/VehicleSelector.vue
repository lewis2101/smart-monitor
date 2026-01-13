<script setup lang="ts">
import SelectInput from "@/widgets/select-input.vue";

const list = [
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
  {
    label: "515FR02",
    description: "Белый ГАЗ ГАЗ A22R33 2024",
    hint: "Населенный пункт: Астана",
    value: "asdasd",
  },
];
</script>

<template>
  <div class="vehicle-selector">
    <select-input :list="list" placeholder="Выбранный авто" show-search />
  </div>
</template>

<style scoped lang="scss">
.vehicle-selector {
  position: relative;
}
</style>
