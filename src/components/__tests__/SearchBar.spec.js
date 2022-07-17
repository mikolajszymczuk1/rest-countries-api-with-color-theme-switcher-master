import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  let wrapper;

  // Helpers
  const findSearchCountryInput = () => wrapper.find('[data-test=search-country-input]');

  // Component factory
  const createComponent = (options = null) => {
    wrapper = mount(SearchBar, options);
  };

  it('Two binding data should works correctly between text input and component variable', async () => {
    createComponent();
    const searchInput = findSearchCountryInput();
    expect(searchInput.element.value).toBe('');
    expect(wrapper.vm.searchedCountry).toBe('');
    searchInput.setValue('test');
    expect(searchInput.element.value).toBe('test');
    expect(wrapper.vm.searchedCountry).toBe('test');
    wrapper.vm.searchedCountry = 'test test';
    await wrapper.vm.$nextTick();
    expect(searchInput.element.value).toBe('test test');
  });

  it('On input component should emits custom event that contains input value', () => {
    createComponent();
    findSearchCountryInput().setValue('test');
    expect(wrapper.emitted('searched-country')[0]).toEqual(['test']);
  });
});
