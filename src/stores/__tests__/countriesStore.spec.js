import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from 'vitest';

import { setActivePinia, createPinia } from 'pinia';
import useCountriesStore from '@/stores/countriesStore';

// Mock data
const mockCountries = [];

['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].forEach((region, index) => {
  mockCountries.push({
    flags: { svg: `test/icon${index}` },
    name: { common: `testName${index}` },
    capital: [`testCapital${index}`],
    region,
    population: index * 100,
  });
});

// Mock fetch function
global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockCountries),
}));

describe('Countries Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Store should has correct default values in state', () => {
    const countriesStore = useCountriesStore();
    expect(countriesStore.allCountries).toEqual([]);
    expect(countriesStore.currentCountry).toBe(null);
    expect(countriesStore.currentRegion).toBe('all');
  });

  describe('Getters', () => {
    it('getCountriesByRegion should return all countries where region is equal filter region', async () => {
      const countriesStore = useCountriesStore();
      await countriesStore.loadAllCountries();
      expect(countriesStore.currentRegion).toBe('all');
      expect(countriesStore.getCountriesByRegion).toEqual(mockCountries);

      ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].forEach((region, index) => {
        countriesStore.currentRegion = region;
        expect(countriesStore.getCountriesByRegion).toEqual([{
          flags: { svg: `test/icon${index}` },
          name: { common: `testName${index}` },
          capital: [`testCapital${index}`],
          region,
          population: index * 100,
        }]);
      });
    });

    it('getCountriesByRegion should returns only countries whose name matches the value of the countryName variable', async () => {
      const countriesStore = useCountriesStore();
      await countriesStore.loadAllCountries();
      expect(countriesStore.getCountriesByName(countriesStore.allCountries, '')).toEqual(mockCountries);
      expect(countriesStore.getCountriesByName(countriesStore.allCountries, 'test')).toEqual(mockCountries);
      expect(countriesStore.getCountriesByName(countriesStore.allCountries, 'testName')).toEqual(mockCountries);
      expect(countriesStore.getCountriesByName(countriesStore.allCountries, 'testName2')).toEqual([{
        flags: { svg: 'test/icon2' },
        name: { common: 'testName2' },
        capital: ['testCapital2'],
        region: 'Asia',
        population: 200,
      }]);
    });
  });

  describe('Actions', () => {
    it('setFilterRegion should correctly set new region in store state', () => {
      const countriesStore = useCountriesStore();
      expect(countriesStore.currentRegion).toBe('all');
      countriesStore.setFilterRegion('Asia');
      expect(countriesStore.currentRegion).toBe('Asia');
      countriesStore.setFilterRegion('SomeRegion');
      expect(countriesStore.currentRegion).toBe('SomeRegion');
    });

    describe('loadAllCountries action', () => {
      it('should load all countries from API and store to state variable', async () => {
        const countriesStore = useCountriesStore();
        await countriesStore.loadAllCountries();
        expect(countriesStore.allCountries).toEqual(mockCountries);
      });

      it('if cant load data from api, should set empty array in state variable', async () => {
        fetch.mockRejectedValueOnce(new Error('Can not load data from API'));
        const countriesStore = useCountriesStore();
        await countriesStore.loadAllCountries();
        expect(countriesStore.allCountries).toEqual([]);
      });
    });
  });
});
