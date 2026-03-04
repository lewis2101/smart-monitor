import { ref } from "vue";
import { defineStore } from "pinia";
import type { AddressData } from "@/components/step-generator/AddressSelector/use-addresses.ts";

export const useMockOrderStore = defineStore("global-image-store", () => {
  const images = ref<string[]>([]);
  const address = ref<AddressData>({
    name: "",
  });
  const description = ref("");

  return {
    images,
    address,
    description,
  };
});
