<template>
  <!-- Country card component -->
  <div
    class="w-[264px] rounded-[5px] overflow-hidden shadow-[0_0_7px_2px_rgba(0,0,0,0.03)]
    dark:bg-dark-blue"
  >
    <!-- Card country flag -->
    <div
      class="w-[100%] h-[160px] bg-no-repeat bg-cover bg-center"
      :style="`background-image: url('${cardData.flag}')`"
      data-test="country-flag"
    />

    <!-- Card basic information -->
    <div class="font-nunito px-[24px] pt-[24px] pb-[46px] dark:text-white">
      <h2
        class="font-extrabold text-very-dark-blue-b text-[1.125rem] mb-[16px] dark:text-white"
        data-test="country-name"
      >
        {{ cardData.name }}
      </h2>

      <p
        class="text-[0.875rem]"
        data-test="country-population"
      >
        <span class="font-semibold">Population:</span>
        {{ population }}
      </p>

      <p
        class="text-[0.875rem]"
        data-test="country-region"
      >
        <span class="font-semibold">Region:</span>
        {{ cardData.region }}
      </p>

      <p
        class="text-[0.875rem]"
        data-test="country-capital"
      >
        <span class="font-semibold">Capital:</span>
        {{ cardData.capital }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    validator(value) {
      return 'name' in value
          && 'population' in value
          && 'region' in value
          && 'capital' in value
          && 'flag' in value;
    },
  },
});

/* Format population value by add commas */
const population = computed(() => props.cardData.population.toLocaleString());
</script>
