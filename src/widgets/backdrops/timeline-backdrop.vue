<script setup lang="ts">
import TimeLine from "primevue/timeline";

defineProps<{
  timeline: {
    label: string;
    description?: string;
    date: string;
  }[];
}>();
</script>

<template>
  <div class="timeline-backdrop">
    <time-line
      :value="timeline"
      :pt="{
        eventOpposite: $style.opposite,
        eventMarker: $style.marker,
      }"
      align="left"
    >
      <template #content="slotProps">
        <div class="timeline-backdrop__item">
          <div class="timeline-backdrop__date">{{ slotProps.item.date }}</div>
          <div class="timeline-backdrop__label">{{ slotProps.item.label }}</div>
          <div class="timeline-backdrop__description">{{ slotProps.item.description }}</div>
        </div>
      </template>
    </time-line>
  </div>
</template>

<style module lang="scss">
.opposite {
  display: none;
}
.marker {
  --p-timeline-event-marker-content-background: #{$main-color};
}
</style>

<style scoped lang="scss">
.timeline-backdrop {
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom)) 16px;

  &__item {
    margin-bottom: 16px;
  }

  &__date {
    font-size: 14px;
    color: $gray-dark;
    margin-bottom: 4px;
  }

  &__label {
    font-size: 16px;
    font-weight: 600;
    text-wrap: balance;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 14px;
  }
}
</style>
