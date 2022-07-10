import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RegionFilter from '@/components/RegionFilter.vue';

describe('RegionFilter.vue', () => {
  it('Should has correct default values', () => {
    const wrapper = mount(RegionFilter, {
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
    });

    const filterItems = wrapper.findAll('[data-test=filter-item]');
    expect(wrapper.find('[data-test=selected-region]').text()).toBe('Filter by Region');
    filterItems.forEach((item, index) => expect(item.text()).toBe(`testItem${index}`));
  });

  it('After click on region filter, should activate regions menu', async () => {
    const wrapper = mount(RegionFilter, {
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
    });

    const selectedRegion = wrapper.find('[data-test=selected-region]');
    expect(wrapper.find('[data-test=filter-items-wrapper]').exists()).toBeFalsy();
    await selectedRegion.trigger('click');
    expect(wrapper.find('[data-test=filter-items-wrapper]').exists()).toBeTruthy();
  });

  it('After click on region name, should set clicked region as selected region', async () => {
    const testRegion = async (wrapper, items, itemIndexToTest) => {
      expect(items[itemIndexToTest].text()).toBe(`testItem${itemIndexToTest}`);
      await items[itemIndexToTest].trigger('click');
      expect(wrapper.find('[data-test=selected-region]').text()).toBe(`testItem${itemIndexToTest}`);
    };

    const wrapper = mount(RegionFilter, {
      props: {
        itemsList: ['testItem0', 'testItem1', 'testItem2'],
      },
    });

    await wrapper.find('[data-test=selected-region]').trigger('click');
    const filterItems = wrapper.findAll('[data-test=filter-item]');
    expect(wrapper.find('[data-test=filter-items-wrapper]').exists()).toBeTruthy();
    await testRegion(wrapper, filterItems, 0);
    await testRegion(wrapper, filterItems, 1);
    await testRegion(wrapper, filterItems, 2);
  });
});
