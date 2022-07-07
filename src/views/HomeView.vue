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
      <section class="mx-[16px] mt-[24px]">
        <SearchBar
          class="mb-[40px]"
          @searched-country="handleSearchedCountry"
        />
        <RegionFilter @region-filter="handleRegionFilter" />
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
