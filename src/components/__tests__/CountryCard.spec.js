import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CountryCard from '@/components/cards/CountryCard.vue';

// Mocked card data
const mockCardData = {
  flag: 'test/icon.svg',
  name: 'testName',
  capital: 'testCapital',
  region: 'testRegion',
  population: 83524522,
};

describe('CountryCard.vue', () => {
  let wrapper;

  // Helpers
  const findCountryFlag = () => wrapper.find('[data-test=country-flag]');
  const findCountryName = () => wrapper.find('[data-test=country-name]');
  const findCountryPopulation = () => wrapper.find('[data-test=country-population]');
  const findCountryRegion = () => wrapper.find('[data-test=country-region]');
  const findCountryCapital = () => wrapper.find('[data-test=country-capital]');

  // Component wrapper factory
  const createComponent = (options = null) => {
    wrapper = mount(CountryCard, options);
  };

  it('Component should render correctly all country card information', () => {
    createComponent({ props: { cardData: mockCardData } });
    expect(findCountryFlag().attributes('style')).toBe('background-image: url(test/icon.svg);');
    expect(findCountryName().text()).toBe('testName');
    expect(findCountryPopulation().text()).toBe('Population: 83,524,522');
    expect(findCountryRegion().text()).toBe('Region: testRegion');
    expect(findCountryCapital().text()).toBe('Capital: testCapital');
  });
});
