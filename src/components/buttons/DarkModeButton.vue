<template>
  <!-- Dark mode button component -->
  <button
    class="flex justify-center items-center text-[0.75em] font-semibold text-very-dark-blue-b"
  >
    <MoonIcon class="w-[16px] h-[16px] mr-[8px]" />
    Dark Mode
  </button>
</template>

<script setup>
import MoonIcon from '@/components/icons/MoonIcon.vue';
</script>
