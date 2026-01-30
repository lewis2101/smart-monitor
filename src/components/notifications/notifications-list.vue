<script setup lang="ts">
import { useGetNotificationsQuery } from "@/api/notification/get-notifications.ts";
import { useQuery } from "@tanstack/vue-query";
import NotificationItem from "@/components/notifications/notification-item.vue";
import { useReadNotificationMutation } from "@/api/notification/read-notification.ts";
import { useIonRouter } from "@ionic/vue";
import { OrderRoutes } from "@/router/router-list.ts";

const router = useIonRouter();

const getNotificationsQuery = useGetNotificationsQuery({});
const { data, suspense } = useQuery(getNotificationsQuery);

const { mutate: readNotificationMutate } = useReadNotificationMutation({});

const handleClick = (orderId: string | number) => {
  readNotificationMutate({
    urlParams: {
      orderId: String(orderId),
    },
  });

  router.push({
    name: OrderRoutes.order,
    params: {
      orderId: String(orderId),
    },
  });
};

await suspense();
</script>

<template>
  <div class="notifications-list">
    <div class="notifications-list__title">Новых сообщений - {{ data.numberOfElements }}</div>
    <notification-item
      v-for="(item, idx) in data.content"
      :key="idx"
      :order-number="item.orderNumber"
      :user-name="item.username"
      :created-at="item.createdAt"
      :message="item.message"
      :is-read="item.isRead"
      class="notifications-list__item"
      @click="handleClick(item.orderId)"
    />
  </div>
</template>

<style scoped lang="scss">
.notifications-list {
  &__title {
    margin-left: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  &__item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
