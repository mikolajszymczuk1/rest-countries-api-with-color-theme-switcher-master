import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
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
    });

    expect(findSelectedRegion().text()).toBe('Filter by Region');
    findAllFilterItems().forEach((item, index) => expect(item.text()).toBe(`testItem${index}`));
  });

  it('After click on region filter, should activate regions menu', async () => {
    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
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
    };

    createComponent({
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
    });

    await findSelectedRegion().trigger('click');
    const filterItems = findAllFilterItems();
    expect(findFilterItemsWrapper().exists()).toBeTruthy();
    await testRegion(filterItems, 0);
    await testRegion(filterItems, 1);
    await testRegion(filterItems, 2);
  });
});
