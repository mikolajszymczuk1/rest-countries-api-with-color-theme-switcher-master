<template>
  <div>
    <!-- ==== Home View ==== -->

    <!-- === Header === -->
    <header>
      <NavigationBar />
    </header>

    <!-- === Main === -->
    <main>
      <!-- Section with all app search/filter tools -->
      <section
        class="mx-[16px] mt-[24px] mb-[32px] sm:mx-[80px] md:mt-[48px] md:flex md:justify-between
        md:items-center md:mb-[48px]"
      >
        <SearchBar
          class="mb-[40px] md:mb-0"
          @searched-country="handleSearchedCountry"
        />

        <RegionFilter
          :items-list="['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']"
          @region-filter="handleRegionFilter"
        />
      </section>

      <!-- Section with all countries cards -->
      <section
        class="grid gap-y-[40px] grid-cols-1 justify-evenly md:justify-between
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 md:mx-[80px] lg:gap-y-[75px]
        pb-[65px] lg:pb-[45px]"
      >
        <CountryCard
          v-for="country in countries"
          :key="country.name.common"
          class="justify-self-center"
          :card-data="{
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital[0],
            flag: country.flags.svg,
          }"
          @country-clicked="handleCountryClicked"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import NavigationBar from '@/components/NavigationBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import RegionFilter from '@/components/RegionFilter.vue';
import CountryCard from '@/components/cards/CountryCard.vue';
import useCountriesStore from '@/stores/countriesStore';

/* Countries store declaration */
const countriesStore = useCountriesStore();

/* Router initialization */
const router = useRouter();

/* Variable that store information about what countries are searched */
const searchedCountryName = ref('');

/* Set new searched country variable value */
const handleSearchedCountry = (searchValue) => { searchedCountryName.value = searchValue; };

/* Set new filter region */
const handleRegionFilter = (region) => countriesStore.setFilterRegion(region);

/* Redirect user to clicked country card's details page */
const handleCountryClicked = (countryName) => router.push(
  { name: 'details', params: { country: countryName } },
);

/* Return filtered countries (By region and by name) */
const countries = computed(() => {
  const countriesByRegion = countriesStore.getCountriesByRegion;
  return countriesStore.getCountriesByName(countriesByRegion, searchedCountryName.value);
});
</script>
