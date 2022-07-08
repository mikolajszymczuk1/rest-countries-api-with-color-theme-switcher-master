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
        md:items-center"
      >
        <SearchBar
          class="mb-[40px] md:mb-0"
          @searched-country="handleSearchedCountry"
        />

        <RegionFilter
          :items-list="['Africa', 'America', 'Asia', 'Europe', 'Oceania']"
          @region-filter="handleRegionFilter"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import RegionFilter from '@/components/RegionFilter.vue';

const handleSearchedCountry = (searchValue) => console.log(searchValue);
const handleRegionFilter = (region) => console.log(region);
</script>
