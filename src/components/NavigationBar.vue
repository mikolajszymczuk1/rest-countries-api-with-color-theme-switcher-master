<template>
  <!-- Navigation bar component -->
  <nav
    class="flex justify-between items-center py-[30px] px-[16px] bg-[white]
    shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
  >
    <h1 class="text-[0.875em] text-very-dark-blue-b font-extrabold">
      Where in the world?
    </h1>

    <DarkModeButton />
  </nav>
</template>

<script setup>
import DarkModeButton from '@/components/buttons/DarkModeButton.vue';
</script>
