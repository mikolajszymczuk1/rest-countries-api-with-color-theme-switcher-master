<template>
  <!-- Dark mode button component -->
  <button
    class="flex justify-center items-center text-[0.75rem] font-semibold text-very-dark-blue-b
    sm:text-[0.85rem] lg:text-[1rem] dark:text-white"
    data-test="dark-mode-button"
    @click="toggleDarkMode()"
  >
    <MoonIcon class="w-[16px] h-[16px] mr-[8px] lg:w-[20px] lg:h-[20px]" />
    Dark Mode
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';

/* Dark mode active status */
const isDarkModeActive = ref('false');

/* Based on idDarkModeActive set dark mode class on root html element */
const setRootDarkModeClass = () => {
  if (isDarkModeActive.value === 'true') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/* Update current dark mode status */
const updateDarkModeStatus = () => {
  if (!localStorage.getItem('darkMode')) {
    localStorage.setItem('darkMode', 'false');
  }

  isDarkModeActive.value = localStorage.getItem('darkMode');
  setRootDarkModeClass();
};

/* Change dark mode active status and update dark mode status in local storage */
const toggleDarkMode = () => {
  isDarkModeActive.value = isDarkModeActive.value === 'true' ? 'false' : 'true';
  localStorage.setItem('darkMode', isDarkModeActive.value);
  setRootDarkModeClass();
};

/* Update dark mode class when component is created */
onMounted(() => updateDarkModeStatus());
</script>
