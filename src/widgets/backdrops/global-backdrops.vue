<script setup lang="ts">
import BaseBackdrop from "@/components/base/base-backdrop/base-backdrop.vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { storeToRefs } from "pinia";
import { useTemplateRef } from "vue";
import BaseIonBackdrop from "@/components/base/base-backdrop/base-ion-backdrop.vue";
import CustomModal from "@/components/custom-modal.vue";

const globalBackdropStore = useGlobalBackdropStore();
const { backdrops } = storeToRefs(globalBackdropStore);

const backdropRefs = useTemplateRef("backdropRefs");
</script>

<template>
  <!--  <base-ion-backdrop-->
  <!--    v-for="(backdrop, idx) in backdrops"-->
  <!--    :key="backdrop.title"-->
  <!--    ref="backdropRefs"-->
  <!--    v-model="backdrop.model"-->
  <!--    :title="backdrop.title"-->
  <!--  >-->
  <!--    <component-->
  <!--      :is="backdrop.component"-->
  <!--      v-bind="backdrop.props"-->
  <!--      @closeBackdrop="backdropRefs?.[idx]?.close"-->
  <!--    />-->
  <!--  </base-ion-backdrop>-->
  <custom-modal
    v-for="(backdrop, idx) in backdrops"
    :key="`${backdrop.id}-${backdrop.title}`"
    :stack-index="idx"
    :close-by-scroll="backdrop.closeByScroll"
    ref="backdropRefs"
    v-model="backdrop.model"
    :title="backdrop.title"
  >
    <component :is="backdrop.component" v-bind="backdrop.props" @closeBackdrop="backdropRefs?.[idx]?.close" />
  </custom-modal>
  <!--  <base-backdrop-->
  <!--    v-for="(backdrop, idx) in backdrops"-->
  <!--    :key="backdrop.title"-->
  <!--    ref="backdropRefs"-->
  <!--    v-model="backdrop.model"-->
  <!--    :title="backdrop.title"-->
  <!--  >-->
  <!--    <component :is="backdrop.component" v-bind="backdrop.props" @closeBackdrop="backdropRefs?.[idx]?.close" />-->
  <!--  </base-backdrop>-->
</template>

<style scoped></style>
