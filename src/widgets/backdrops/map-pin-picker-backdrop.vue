<script setup lang="ts">
import BaseMap from "@/components/map/base-map.vue";
import { computed, onMounted, useTemplateRef } from "vue";
import { IonSpinner } from "@ionic/vue";
import { useWialonAddressQuery } from "@/api/map/wialon-address.ts";
import { useQuery } from "@tanstack/vue-query";
import { useOsmAddressQuery } from "@/api/map/osm-address.ts";
import { IonButton } from "@ionic/vue";
import { useMapCenterPin } from "@/composables/map/useMapCenterPin.ts";
import maplibregl from "maplibre-gl";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import type { AddressInfo } from "@/api/map/types.ts";
import { useToast } from "primevue/usetoast";

const props = withDefaults(
  defineProps<
    {
      placeholder?: string;
      initialCoords?: {
        lng: number | null;
        lat: number | null;
      };
    } & BackdropComponentProps<(value: AddressInfo) => void, (error: Error) => void>
  >(),
  {
    initialCoords: () => ({
      lng: null,
      lat: null,
    }),
  },
);

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const mapRef = useTemplateRef<{ map: maplibregl.Map }>("mapRef");
const toast = useToast();

const { init, selectedCoords } = useMapCenterPin({
  mapRef: () => mapRef.value?.map ?? null,
  props,
});

const wialonAddressQuery = useWialonAddressQuery({
  params: computed(() => ({
    posList: [[selectedCoords.lng, selectedCoords.lat]],
  })),
});
const osmAddressQuery = useOsmAddressQuery({
  params: computed(() => ({
    posList: [[selectedCoords.lng, selectedCoords.lat]],
  })),
});

const {
  data: osmData,
  isError,
  isPending: osmPending,
} = useQuery({
  ...osmAddressQuery,
  enabled: computed(() => !!selectedCoords.lat && !!selectedCoords.lng),
});

const { data: wialonData, isPending: wialongPending } = useQuery({
  ...wialonAddressQuery,
  enabled: computed(() => !!selectedCoords.lat && !!selectedCoords.lng && isError.value),
});

const handleSave = () => {
  if (osmData.value) {
    const data = osmData.value.find(Boolean);
    if (data) {
      props.onSuccess?.(data);
      emit("closeBackdrop");
      return;
    }
  }

  if (wialonData.value) {
    const data = wialonData.value.find(Boolean);
    if (data) {
      props.onSuccess?.(data);
      emit("closeBackdrop");
      return;
    }
  }

  toast.add({
    severity: "error",
    summary: "Ошибка",
    detail: "Ошибка при сохранении координат",
    life: 3000,
  });
};

onMounted(() => {
  init();
});

const addressText = computed(() => {
  if (osmData.value) {
    return osmData.value.find(Boolean)?.formatted_path;
  }

  if (wialonData.value) {
    return wialonData.value.find(Boolean)?.formatted_path;
  }
  return null;
});

const hasSelectedCoords = computed(() => !!selectedCoords.lat && !!selectedCoords.lng);
const isLoading = computed(() => hasSelectedCoords.value && (osmPending.value || wialongPending.value));
</script>

<template>
  <div class="map-picker-backdrop" @pointerdown.stop @pointerup.prevent.stop>
    <base-map ref="mapRef" />
    <div class="map-picker-backdrop__address">
      <div class="map-picker-backdrop__wrapper">
        <div :class="['map-picker-backdrop__placeholder', addressText && 'map-picker-backdrop__placeholder_focus']">
          {{ placeholder }}
        </div>
        <div v-if="addressText" class="map-picker-backdrop__value">
          {{ addressText }}
        </div>
        <ion-spinner v-if="isLoading" name="circular" class="map-picker-backdrop__spinner" />
      </div>
    </div>
    <transition name="fade">
      <ion-button v-if="addressText" class="map-picker-backdrop__button" @click="handleSave">{{
        $t("common.save")
      }}</ion-button>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.map-picker-backdrop {
  position: relative;
  width: 100%;
  height: calc(100vh - (100px + env(safe-area-inset-top) + env(safe-area-inset-bottom)));

  &__address {
    background: #ffffff;

    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid var(--System-Gray-Light, #f2f2f7);
    border-radius: 12px;

    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    min-height: 56px;
  }

  &__wrapper {
    position: relative;
    padding: 20px 16px 12px 16px;
  }

  &__placeholder {
    position: relative;
    bottom: 4px;
    color: inherit;

    transition: all 0.2s ease;

    padding-right: 24px;

    &_focus {
      position: absolute;

      font-size: 12px;
      top: 6px;
      left: 16px;
    }
  }

  &__value {
    margin-top: 4px;
  }

  &__spinner {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: $main-color;
  }

  &__button {
    position: fixed;
    bottom: calc(8px + env(safe-area-inset-bottom));
    left: 16px;
    right: 16px;
  }
}
</style>
