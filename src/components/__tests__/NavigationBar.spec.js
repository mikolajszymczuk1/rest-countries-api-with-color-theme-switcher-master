import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationBar from '@/components/NavigationBar.vue';

describe('NavigationBar.vue', () => {
  let wrapper;

  // Helpers
  const findNavigationHeading = () => wrapper.find('[data-test=navigation-heading]');

  // Component factory
  const createComponent = (options = null) => {
    wrapper = mount(NavigationBar, options);
  };

  it('Should has h1 heading with correct text', () => {
    createComponent();
    expect(findNavigationHeading().text()).toBe('Where in the world?');
  });
});
