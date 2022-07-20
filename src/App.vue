<template>
  <RouterView v-slot="{ Component }">
    <Component :is="Component" />
  </RouterView>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import useCountriesStore from '@/stores/countriesStore';

/* Countries store declaration */
const countriesStore = useCountriesStore();

/* When component is created, load all countries data to store state */
onMounted(() => countriesStore.loadAllCountries());
</script>
