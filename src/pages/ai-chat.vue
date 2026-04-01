<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage, IonFooter, IonButton, useIonRouter } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import BaseTextarea from "@/components/base/base-textarea/base-textarea.vue";
import { computed, ref, watch } from "vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { AiChatMessages } from "@/widgets/ai-chat-messages";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import { storeToRefs } from "pinia";
import type { MessageGroup, MessageRole } from "@/widgets/ai-chat-messages/types.ts";
import { useActionNaviChat } from "@/api/navi/navi-chat.ts";
import { useLocalStorage } from "@vueuse/core";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import { useRoute } from "vue-router";
import { MainTabRoutes } from "@/router/router-list.ts";
import { useExtractErrorData } from "@/composables/use-extract-error-data.ts";
import { useToast } from "primevue/usetoast";

const router = useIonRouter();
const route = useRoute();
const chatIndex = Number(route.params.chat) as number;

const inputModel = ref("");

const { isVisibleKeyboard } = storeToRefs(useKeyboardStore());
const globalBackdropStore = useGlobalBackdropStore();

const { mutateAsync, isPending, error } = useActionNaviChat({});

const showKeyboardPadding = computed(() =>
  isVisibleKeyboard.value ? "0 10px 10px 10px" : "0 10px calc(10px + env(safe-area-inset-bottom)) 10px",
);

const messages = useLocalStorage<MessageGroup[]>("ai-chat-messages", () => []);

const toast = useToast();
const { getErrorForToast } = useExtractErrorData();

const openMoreMenu = async () => {
  try {
    const result = (await globalBackdropStore.push("pick", {
      title: "Настройки",
      props: {
        list: [
          {
            label: "Очистить историю",
            value: "clear",
          },
        ],
      },
    })) as "clear";

    if (result === "clear") {
      messages.value = messages.value.filter((_, idx) => idx !== chatIndex);
      router.replace({
        name: MainTabRoutes.aiChatList,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addMessage = (role: MessageRole, text: string) => {
  if (chatIndex >= 0) {
    messages.value[chatIndex]?.messages.push({
      type: "message",
      role,
      date: new Date(),
      text,
    });
    return;
  }

  messages.value.push({
    date: new Date(),
    messages: [
      {
        type: "message",
        role,
        date: new Date(),
        text,
      },
    ],
  });
};

const handleClick = async () => {
  const text = inputModel.value.trim();

  if (!text.length) return;

  addMessage("user", text);
  inputModel.value = "";

  const { data } = await mutateAsync({
    data: {
      message: text,
      context: {},
    },
  });

  addMessage("other", data.answer);
};

watch(error, (value) => {
  if (value) {
    toast.add(getErrorForToast(value));
  }
});
</script>

<template>
  <ion-page class="ai-chat-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="ИИ Ассистент">
          <template #append-right>
            <base-icon name="more-horizontal" @click="openMoreMenu" />
          </template>
        </default-layout-header>
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <ai-chat-messages
        :content="messages"
        hint="Чем могу помочь?"
        :current-index="chatIndex"
        :is-writing="isPending"
      />
    </base-content-with-refresher>

    <ion-footer class="chat-footer">
      <div class="chat-footer__wrapper">
        <base-textarea
          v-model="inputModel"
          :min-height="30"
          native-placeholder="Введите сообщение..."
          class="chat-footer__input"
        />
        <ion-button
          class="chat-footer__button"
          :disabled="isPending || inputModel.length === 0"
          @mousedown.prevent
          @click="handleClick"
        >
          <ion-spinner v-if="isPending" name="dots" />
          <base-icon v-else name="send" class="chat-footer__icon" />
        </ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<style scoped lang="scss">
.ai-chat-page {
}

.chat-footer {
  border: 1px $gray-light solid;
  --padding: v-bind(showKeyboardPadding);

  &__wrapper {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    background: $white;
    padding: var(--padding);
  }

  &__input {
    flex-grow: 1;
    border: 1px #e2e8f0 solid;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &__button {
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 12px;

    &::part(native) {
      padding: 0;
      width: 46px;
      height: 46px;
      min-height: 32px;
      border-radius: 50%;
    }
  }
}
</style>
