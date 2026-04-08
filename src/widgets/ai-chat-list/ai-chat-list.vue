<script setup lang="ts">
import { CommonRoutes } from "@/router/router-list.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useIonRouter } from "@ionic/vue";
import { useLocalStorage } from "@vueuse/core";
import type { Message, MessageGroup } from "@/widgets/ai-chat-messages/types.ts";
import { computed } from "vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

const router = useIonRouter();

const aiChats = useLocalStorage<MessageGroup[]>("ai-chat-messages", () => []);

const getLastMessage = (messages: Message[]) => {
  const lastMessageItem = messages[messages.length - 1];

  return lastMessageItem as Message;
};

const preparedAiChats = computed(() =>
  aiChats.value.map((chat) => {
    const lastMessage = getLastMessage(chat.messages);

    if (lastMessage) {
      return {
        date: chat.date,
        lastMessage: lastMessage.text,
        lastMessageRole: lastMessage.role === "user" ? "Вы" : "ИИ",
      };
    }

    return {
      date: chat.date,
      lastMessage: "",
      lastMessageRole: "",
    };
  }),
);

const createNewChat = () => {
  aiChats.value.push({
    date: new Date(),
    messages: [],
  });

  const chatIndex = aiChats.value.length - 1;

  router.push({
    name: CommonRoutes.aiChat,
    params: {
      chat: chatIndex,
    },
  });
};

await mockDelayPromise();
</script>

<template>
  <base-island-block class="ai-chat-list" title="Чаты" :shadow="false" :clickable="false">
    <template v-if="preparedAiChats.length">
      <base-island-block
        v-for="(item, idx) in preparedAiChats"
        :key="idx"
        class="ai-chat-list__item"
        @click="router.push({ name: CommonRoutes.aiChat, params: { chat: idx } })"
      >
        <div class="ai-chat-list__item-title">Чат №{{ idx + 1 }}</div>
        <div v-if="item.lastMessage" class="ai-chat-list__item-content">
          <span class="ai-chat-list__item-role">{{ item.lastMessageRole }}:</span> {{ item.lastMessage }}
        </div>
        <div v-else class="ai-chat-list__item-title">Сообщений пока нет</div>
      </base-island-block>
    </template>

    <base-island-block v-else class="ai-chat-list__empty" :clickable="false">
      Список чатов пуст
    </base-island-block>

    <ion-button @click="createNewChat"> Создать новый чат </ion-button>
  </base-island-block>
</template>

<style scoped lang="scss">
.ai-chat-list {
  padding: 0;

  &__item {
    padding: 20px;
  }

  &__item-title {
    font-weight: bold;
    font-size: 14px;
  }

  &__item-content {
    padding: 0 8px;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;

    color: $gray-dark;
  }

  &__item-role {
    font-weight: bold;
    font-size: 14px;
    color: $black;
  }

  &__empty {
    text-align: center;
    font-weight: bold;
    padding: 20px;
  }
}
</style>
