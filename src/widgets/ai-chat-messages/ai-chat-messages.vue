<script setup lang="ts">
import { IonSpinner } from "@ionic/vue";
import { nextTick, onMounted, useTemplateRef, watch } from "vue";
import { formatDateString } from "@/utils/formatDate.ts";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import type { AiChatMessagesProps } from "@/widgets/ai-chat-messages/types.ts";

const props = withDefaults(defineProps<AiChatMessagesProps>(), {
  isWriting: false,
});

await mockDelayPromise();

const bottomRef = useTemplateRef("bottomRef");

const scrollToBottom = async (behavior: "instant" | "smooth" = "instant") => {
  await nextTick();
  bottomRef.value?.scrollIntoView({
    behavior,
  });
};

onMounted(() => {
  scrollToBottom();
});

watch(
  () => props.content,
  () => {
    scrollToBottom("smooth");
  },
  {
    deep: true,
  },
);
</script>

<template>
  <TransitionGroup name="message" tag="div" class="chat">
    <template v-for="group in content" :key="group.date">
      <div class="chat__group">
        <div class="chat__group-date">
          {{ formatDateString(group.date, { relative: true }) }}
        </div>
      </div>

      <div v-for="(message, idx) in group.messages" :key="idx" :class="['chat__message', `chat__${message.role}`]">
        <div class="chat__content">{{ message.text }}</div>
        <div class="chat__date">
          {{ formatDateString(new Date(message.date), { time: true }) }}
        </div>
      </div>
    </template>

    <div v-if="isWriting" :class="['chat__message chat__other']">
      <div class="chat__content">
        <ion-spinner name="dots" color="light" />
      </div>
    </div>

    <div v-if="hint && content.flat().length === 0" class="chat__hint">
      {{ hint }}
    </div>

    <div ref="bottomRef" />
  </TransitionGroup>
</template>

<style scoped lang="scss">
.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.message-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.message-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.message-move {
  transition: transform 0.3s ease;
}

.chat {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - (170px + env(safe-area-inset-bottom)));

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;

  &__group {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    position: sticky;
    top: 16px;
  }

  &__group-date {
    font-size: 14px;
    padding: 4px 6px;
    background: $main-color;
    color: $white;
    border-radius: 24px;
    box-shadow: 0px 2px 3px 0px #0000001a;
    border: 1px solid $secondary-color;
  }

  &__hint {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    //background: red;
    text-align: center;
    color: $gray-dark;
  }

  &__content {
    width: 100%;
    text-align: left;
  }

  &__message {
    box-shadow: 0 2px 3px 0 #0000001a;
    border: 1px solid #f2f2f7;
    padding: 8px 12px;

    .chat__date {
      color: #90a1b9;
    }
  }

  &__other {
    margin-right: 24px;
    border-radius: 16px 16px 16px 0;
    background: $secondary-color;
    color: $white;

    .chat__date {
      color: $white;
    }
  }

  &__user {
    margin-left: 24px;
    border-radius: 16px 16px 0 16px;
    align-self: flex-end;
  }

  &__date {
    font-size: 12px;
    text-align: right;
  }
}
</style>
