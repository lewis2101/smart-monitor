<script setup lang="ts">
import { IonPage, useIonRouter } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { computed, onMounted, ref } from "vue";
import { IonButton } from "@ionic/vue";
import { MainTabRoutes, OrderRoutes } from "@/router/router-list.ts";
import { useRoute } from "vue-router";
import { formatDateString } from "@/utils/formatDate.ts";

type Status = "CREATED" | "UPDATED" | "MOCK_CREATE" | "MOCK_APPROVE" | "MOCK_TAKE" | "MOCK_FINISH";

const statusMap: Record<Status, string> = {
  CREATED: "Успешно создана",
  UPDATED: "Успешно обновлена",
  MOCK_CREATE: "Вы отправили заявку в отдел ТБ",
  MOCK_APPROVE: "Заявка отправлена в отдел АХО",
  MOCK_TAKE: "Заявка отправлена в работу",
  MOCK_FINISH: "Вы выполнили задачу",
};

const router = useIonRouter();
const route = useRoute();

const orderId = computed(() => route.params.orderId as string);
const isMock = computed(() => route.query.mock === "true");
const statusText = computed(() => statusMap[route.params.status as Status] || statusMap.UPDATED);
const showHome = computed(() => route.query.mock === "true" && !nextMockStep.value);
const nextMockStep = computed(() => route.query.nextMockStep);
const formattedDate = computed(() => {
  const date = route.query.date as string | undefined;
  if (date) {
    return formatDateString(new Date(date), { time: true });
  }
  return "";
});

const showSuccess = ref(false);
const showHomeButton = ref(false);
const showOrderButton = ref(false);

const handleOpenOrder = () => {
  if (isMock.value) {
    router.replace({
      name: OrderRoutes.mockOrder,
      params: { processKey: "PAB" },
      query: { mockOrderStep: nextMockStep.value },
    });

    return;
  }

  router.replace({ name: OrderRoutes.order, params: { orderId: orderId.value } });
};

onMounted(() => {
  setTimeout(() => {
    showSuccess.value = true;

    setTimeout(() => {
      showHomeButton.value = true;

      setTimeout(() => {
        showOrderButton.value = true;
      }, 300);
    }, 300);
  }, 500);
});
</script>

<template>
  <ion-page class="service-page">
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <div class="success-order">
        <div :class="['success-order__image', showSuccess && 'success-order__image-show']">
          <img src="@/assets/images/success.png" alt="success-image" />
        </div>
        <div class="success-order__title">Заявка №{{ orderId }}</div>
        <div class="success-order__description">{{ statusText }}</div>
        <div class="success-order__description">{{ formattedDate }}</div>
      </div>
      <div class="success-order__button-wrapper">
        <ion-button
          v-if="showHome"
          fill="outline"
          :class="['success-order__button', showHomeButton && 'success-order__button-show']"
          @click="router.replace({ name: MainTabRoutes.home })"
        >
          Вернуть на главную
        </ion-button>
        <ion-button
          v-if="!showHome"
          :class="['success-order__button', showOrderButton && 'success-order__button-show']"
          @click="handleOpenOrder"
        >
          Перейти в заявку
        </ion-button>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.success-order {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  height: 80vh;

  &__image {
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
    margin-bottom: 16px;

    img {
      width: 130px;
    }

    &-show {
      transform: scale(1);
      opacity: 1;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
  }
  &__description {
    font-size: 16px;
    color: $gray-dark;
  }

  &__button-wrapper {
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: calc(8px + env(safe-area-inset-bottom));
  }

  &__button {
    width: 100%;
    margin-bottom: 8px;
    opacity: 0;
    transition: all 0.3s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &-show {
      opacity: 1;
    }
  }
}
</style>
