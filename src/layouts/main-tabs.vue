<script setup lang="ts">
import MainFooter from "@/components/main/main-footer/main-footer.vue";
import { IonRouterOutlet, IonTabs, IonPage } from "@ionic/vue";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import { useRoute } from "vue-router";
import { computed, watch } from "vue";

const { setSecondaryColor, setMainColor } = useStatusBarColor();

const tabsStatusBarColors = {
  home: () => setMainColor(),
  docs: () => setSecondaryColor(),
};

const route = useRoute();
const currentRoute = computed(() => route.name);

watch(currentRoute, (value) => {
  if (value) {
    // @ts-ignore
    tabsStatusBarColors[value]?.();
  }
}, {
  immediate: true,
});
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <main-footer />
    </ion-tabs>
  </ion-page>
</template>

<style lang="scss" scoped></style>
