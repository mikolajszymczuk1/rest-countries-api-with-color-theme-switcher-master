import { defineStore } from 'pinia';

/* Api urls */
const basicApiUrl = 'https://restcountries.com/v3.1';
const allCountriesUrl = `${basicApiUrl}/all?fields=name,population,region,capital,flags`;

/* Countries store */
const useCountriesStore = defineStore({
  id: 'countries',
  state: () => ({
    allCountries: null, // Array with all countries
    currentCountry: null, // Object with information about clicked country card
  }),
  actions: {
    /* Get all countries from Country API */
    async loadAllCountries() {
      await fetch(allCountriesUrl)
        .then((res) => res.json())
        .then((data) => { this.allCountries = data; })
        .catch(() => { this.allCountries = []; });
    },
  },
});

export default useCountriesStore;
