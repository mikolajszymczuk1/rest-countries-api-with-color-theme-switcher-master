<template>
  <!-- Dark mode button component -->
  <button
    class="flex justify-center items-center text-[0.75rem] font-semibold text-very-dark-blue-b
    sm:text-[0.85rem] lg:text-[1rem]"
  >
    <MoonIcon class="w-[16px] h-[16px] mr-[8px] lg:w-[20px] lg:h-[20px]" />
    Dark Mode
  </button>
</template>

<script setup>
import MoonIcon from '@/components/icons/MoonIcon.vue';
</script>
