import { ref } from "vue";
import { defineStore } from "pinia";
import type { AddressData } from "@/components/step-generator/AddressSelector/use-addresses.ts";

export const useMockOrderStore = defineStore("global-image-store", () => {
  // step-1
  const images = ref<string[]>([]);
  const address = ref<AddressData>({
    name: "",
  });
  const description = ref("");

  // step-2
  const categoryId = ref("");
  const categoryList = [
    {
      label: "Уборка и благоустройства",
      value: "1",
    },
    {
      label: "Электрика",
      value: "2",
    },
    {
      label: "Водоснабжение и канализация",
      value: "3",
    },
    {
      label: "Отопление и вентиляция",
      value: "4",
    },
    {
      label: "Здание и конструкция",
      value: "5",
    },
    {
      label: "Безопасность / Техника / безопасности",
      value: "6",
    },
    {
      label: "Оборудование и инвентарь",
      value: "7",
    },
    {
      label: "Прочее / Административное",
      value: "8",
    },
  ];

  const mustId = ref("");
  const mustList = [
    {
      label: "Отдель охраны труда и техники безопасности (ОТиТБ)",
      value: "1",
    },
    {
      label: "АХО (Административно-хозяйственный отдел)",
      value: "2",
    },
    {
      label: "Строительно-ремонтный участок",
      value: "3",
    },
    {
      label: "Электротехнический отдел",
      value: "4",
    },
    {
      label: "Сантехнический отдел",
      value: "5",
    },
    {
      label: "Отдел эксплуатации зданий / инженерная служба",
      value: "6",
    },
    {
      label: "Служба безопасности / охрана объекта",
      value: "7",
    },
    {
      label: "Администрация / диспетчерская служба",
      value: "8",
    },
  ];

  const dateModel = ref<Date | string | null>(null);

  // step-3
  const eventId = ref("");
  const eventList = [
    {
      label: "Устранить сосульки и наледь",
      value: "1",
    },
    {
      label: "Очистить территорию от снега и льда",
      value: "2",
    },
    {
      label: "Оградить опасную зону",
      value: "3",
    },
    {
      label: "Проверить состояние фасада и козырька",
      value: "4",
    },
    {
      label: "Удалить опасные образования с крыши / козырька",
      value: "5",
    },
    {
      label: "Посыпать скользкий участок песком / реагентом",
      value: "6",
    },
    {
      label: "Сообщить в АХО о повреждениях или рисках",
      value: "7",
    },
    {
      label: "Провести осмотр и зафиксировать состояние объекта",
      value: "8",
    },
  ];

  const supplierId = ref("");
  const supplierList = [
    {
      label: "Канатов Ермек",
      value: "1",
    },
    {
      label: "Ермеков Усман",
      value: "2",
    },
    {
      label: "Усманов Ерлан",
      value: "3",
    },
    {
      label: "Ерланов Азамат",
      value: "4",
    },
  ];

  // step-4
  const resultPhoto = ref<string[]>([]);

  const clear = () => {
    images.value = [];
    address.value = {
      name: "",
    };
    description.value = "";

    categoryId.value = "";
    mustId.value = "";
    dateModel.value = null;

    eventId.value = "";
    supplierId.value = "";

    resultPhoto.value = [];
  };

  return {
    images,
    address,
    description,
    categoryId,
    categoryList,
    mustId,
    mustList,
    dateModel,
    eventId,
    eventList,
    supplierId,
    supplierList,
    resultPhoto,
    clear,
  };
});
