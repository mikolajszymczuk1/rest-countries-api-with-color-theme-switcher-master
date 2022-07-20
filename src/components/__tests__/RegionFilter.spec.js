import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';

import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import RegionFilter from '@/components/RegionFilter.vue';

describe('RegionFilter.vue', () => {
  let wrapper;

  // Helpers
  const findAllFilterItems = () => wrapper.findAll('[data-test=filter-item]');
  const findSelectedRegion = () => wrapper.find('[data-test=selected-region]');
  const findFilterItemsWrapper = () => wrapper.find('[data-test=filter-items-wrapper]');

  // Component factory
  const createComponent = (options = null) => {
    wrapper = mount(RegionFilter, options);
  };

  it('Should has correct default values', () => {
    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    expect(findSelectedRegion().text()).toBe('Filter by Region');
    findAllFilterItems().forEach((item, index) => expect(item.text()).toBe(`testItem${index}`));
  });

  it('After click on region filter, should activate regions menu', async () => {
    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    expect(findFilterItemsWrapper().exists()).toBeFalsy();
    await findSelectedRegion().trigger('click');
    expect(findFilterItemsWrapper().exists()).toBeTruthy();
  });

  it('After click on region name, should set clicked region as selected region', async () => {
    const testRegion = async (items, itemIndexToTest) => {
      expect(items[itemIndexToTest].text()).toBe(`testItem${itemIndexToTest}`);
      await items[itemIndexToTest].trigger('click');
      expect(findSelectedRegion().text()).toBe(`testItem${itemIndexToTest}`);
      expect(wrapper.emitted('region-filter')[itemIndexToTest]).toEqual([`testItem${itemIndexToTest}`]);
    };

    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    await findSelectedRegion().trigger('click');
    const filterItems = findAllFilterItems();
    expect(findFilterItemsWrapper().exists()).toBeTruthy();
    await testRegion(filterItems, 0);
    await testRegion(filterItems, 1);
    await testRegion(filterItems, 2);
  });

  it('If currentRegion in store has some region value set, should load this value to filter', async () => {
    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              countries: { currentRegion: 'Asia' },
            },
          }),
        ],
      },
    });

    await wrapper.vm.$nextTick();
    expect(findSelectedRegion().text()).toBe('Asia');
  });
});
