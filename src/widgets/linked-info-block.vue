<script setup lang="ts">
import BaseListItem from "@/components/base/base-list-item/base-list-item.vue";
import BaseLinkedInfo from "@/components/base/base-linked-info/base-linked-info.vue";
import BaseList from "@/components/base/base-list/base-list.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { useIonRouter } from "@ionic/vue";

defineProps<{
  list: Array<{
    title: string;
    icon?: string;
    to?: string;
    list: Array<{
      text: string;
      marked?: boolean;
    }>;
  }>;
}>();

const router = useIonRouter();

const handleClick = (to?: string) => {
  if (to) {
    router.push(to);
  }
};
</script>

<template>
  <base-island-block
    v-for="item in list"
    :key="item.title"
    rounded="S"
    class="linked-info"
    @click="handleClick(item.to)"
  >
    <base-linked-info :title="item.title" :icon="item.icon" />
    <base-list :class="[item.icon && 'linked-info__list-icon']">
      <base-list-item
        v-for="list in item.list"
        :key="list.text"
        :class="['linked-info__list-item', list.marked && 'linked-info_marked']"
      >
        {{ list.text }}
      </base-list-item>
    </base-list>
  </base-island-block>
</template>

<style scoped lang="scss">
.linked-info {
  padding: 16px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &__list-icon {
    padding: 0 clamp(32px, 10vw, 48px);
  }

  &__list-item {
    list-style: none;
    margin-bottom: 4px;
  }

  &_marked {
    list-style: initial;
    &::marker {
      color: $main-red;
    }
  }
}
</style>
