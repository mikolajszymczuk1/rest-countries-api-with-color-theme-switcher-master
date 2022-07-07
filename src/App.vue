<template>
  <RouterView v-slot="{ Component }">
    <Component :is="Component" />
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
