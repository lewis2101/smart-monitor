<script setup lang="ts"></script>

<template>
  <Suspense>
    <template #default>
      <Transition name="fade" appear>
        <slot name="default" />
      </Transition>
    </template>

    <template #fallback>
      <slot name="fallback" />
    </template>
  </Suspense>
</template>

<style scoped></style>
