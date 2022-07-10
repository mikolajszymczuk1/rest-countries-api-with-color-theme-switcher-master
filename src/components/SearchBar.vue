<template>
  <!-- Search bar component -->
  <div
    class="relative h-[48px] md:h-[56px] rounded-[5px] shadow-[0_2px_9px_rgba(0,0,0,0.053)]
    overflow-hidden md:w-[480px]"
  >
    <SearchIcon
      class="w-[16px] h-[16px] absolute top-[50%] left-[32px] translate-y-[-50%]
      md:w-[18px] md:h-[18px]"
    />

    <input
      v-model.trim="searchedCountry"
      class="w-[100%] h-[100%] text-very-dark-blue-b placeholder:text-[0.75rem]
      md:placeholder:text-[0.875rem] placeholder:text-dark-gray/[0.5] outline-0
      pl-[74px] pr-[25px] bg-white"
      type="text"
      name="search-country"
      placeholder="Search for a country..."
      data-test="search-country-input"
      @input="emitSearchedCountry()"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';

/* Event declaration */
const emit = defineEmits(['searched-country']);

/* Searched country string */
const searchedCountry = ref('');

/* Emit custom event with searched country input value */
const emitSearchedCountry = () => emit('searched-country', searchedCountry.value);
</script>
