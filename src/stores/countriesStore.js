import { defineStore } from 'pinia';

/* Api urls */
const basicApiUrl = 'https://restcountries.com/v3.1';
const allCountriesUrl = `${basicApiUrl}/all?fields=name,population,region,capital,flags`;
const currentCountryUrl = `${basicApiUrl}/name`;

/* Countries store */
const useCountriesStore = defineStore({
  id: 'countries',
  state: () => ({
    allCountries: [], // Array with all countries (after all filters)
    currentCountry: null, // Object with information about clicked country card
    currentRegion: 'all',
  }),
  getters: {
    /* Return countries filtered by region */
    getCountriesByRegion: (state) => {
      if (state.currentRegion === 'all') return state.allCountries;
      return state.allCountries.filter((country) => country.region === state.currentRegion);
    },

    /* Return countries filtered by name */
    getCountriesByName: () => (arr, countryName) => arr.filter((country) => {
      const regexCountryName = new RegExp(`${countryName}`, 'i');
      const result = country.name.common.match(regexCountryName);
      return (result && result.index === 0);
    }),
  },
  actions: {
    /* Method set new current filter region */
    setFilterRegion(newRegion) {
      this.currentRegion = newRegion;
    },

    /* Get all countries from Country API */
    async loadAllCountries() {
      await fetch(allCountriesUrl)
        .then((res) => res.json())
        .then((data) => { this.allCountries = data; })
        .catch(() => { this.allCountries = []; });
    },

    /* Get information about country with name = 'countryName' */
    async loadNewCurrentCountry(countryName) {
      await fetch(`${currentCountryUrl}/${countryName}`)
        .then((res) => res.json())
        .then((data) => { [this.currentCountry] = data; })
        .catch(() => { this.currentCountry = {}; });
    },
  },
});

export default useCountriesStore;
