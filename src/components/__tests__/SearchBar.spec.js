import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

describe('SearchBar.vue', () => {
  it('Two binding data should works correctly between text input and component variable', async () => {
    const wrapper = mount(SearchBar);
    const searchInput = wrapper.find('[data-test=search-country-input]');
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
    const wrapper = mount(SearchBar);
    wrapper.find('[data-test=search-country-input]').setValue('test');
    expect(wrapper.emitted('searched-country')[0]).toEqual(['test']);
  });
});
