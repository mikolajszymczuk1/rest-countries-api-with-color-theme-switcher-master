<template>
  <div>
    <!-- ==== Details view ==== -->

    <!-- === Header === -->
    <header>
      <NavigationBar />
    </header>

    <!-- === Main === -->
    <main>
      <!-- Go back button section -->
      <section class="pl-[28px] pt-[40px] pb-[64px]">
        <RouterLink
          to="/"
          class="flex justify-center items-center shadow-[0_0_7px_0_rgba(0,0,0,0.3)]
          px-[23px] py-[6px] w-[104px] dark:text-white dark:bg-dark-blue rounded-[2px]"
        >
          <ArrowIcon class="mr-[8px]" />
          Back
        </RouterLink>
      </section>

      <!-- Country details section -->
      <section class="px-[28px] pb-[60px]">
        <!-- Country big image -->
        <div
          class="bg-no-repeat bg-cover bg-center w-[100%] h-[229px] rounded-[5px] mb-[44px]"
          :style="`background-image: url(${countryDetails.flag});`"
        />

        <!-- Country info -->
        <article>
          <h1 class="font-nunito font-extrabold text-[1.375rem] mb-[16px]">
            {{ countryDetails.name }}
          </h1>

          <div class="mb-[34px] font-nunito text-[0.875rem]">
            <div class="mb-[32px]">
              <p class="mb-[10px]">
                <span class="font-semibold">Native Name:</span>
                {{ countryDetails.nativeName }}
              </p>

              <p class="mb-[10px]">
                <span class="font-semibold">Population:</span>
                {{ countryDetails.population.toLocaleString() }}
              </p>

              <p class="mb-[10px]">
                <span class="font-semibold">Region:</span> {{ countryDetails.region }}
              </p>

              <p class="mb-[10px]">
                <span class="font-semibold">Sub Region:</span>
                {{ countryDetails.subRegion }}
              </p>

              <p>
                <span class="font-semibold">Capital:</span>
                {{ countryDetails.capital }}
              </p>
            </div>

            <div>
              <p class="mb-[10px]">
                <span class="font-semibold">Top Level Domain:</span>
                {{ countryDetails.topLevelDomain }}
              </p>

              <p class="mb-[10px]">
                <span class="font-semibold">Currencies:</span>
                {{ countryDetails.currencies }}
              </p>

              <p>
                <span class="font-semibold">Languages: </span>
                <span
                  v-for="lang in countryDetails.languages"
                  :key="lang"
                >
                  {{ lang }},
                </span>
              </p>
            </div>
          </div>

          <div class="flex flex-col">
            <span class="mb-[16px]">Border Countries:</span>
            <div class="flex">
              <div
                v-for="borderCountry in countryDetails.bordersCountries"
                :key="borderCountry"
                class="font-nunito text-[0.75rem] mr-[10px] px-[15px] py-[6px]
                shadow-[0_0_4px_1px_rgba(0,0,0,0.11)]"
              >
                {{ borderCountry }}
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import useCountriesStore from '@/stores/countriesStore';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import NavigationBar from '@/components/NavigationBar.vue';

/* Define countries store */
const countriesStore = useCountriesStore();

/* Mapped country details data */
const countryDetails = {
  name: countriesStore.currentCountry.name.common,
  nativeName: Object.values(countriesStore.currentCountry.name.nativeName)[0].common,
  population: countriesStore.currentCountry.population,
  region: countriesStore.currentCountry.region,
  subRegion: countriesStore.currentCountry.subregion,
  capital: countriesStore.currentCountry.capital[0],
  flag: countriesStore.currentCountry.flags.svg,
  topLevelDomain: countriesStore.currentCountry.tld[0],
  currencies: Object.values(countriesStore.currentCountry.currencies)[0].name,
  languages: countriesStore.currentCountry.languages,
  bordersCountries: countriesStore.currentCountry.borders,
};
</script>
