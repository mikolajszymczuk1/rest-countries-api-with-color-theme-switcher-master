import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationBar from '@/components/NavigationBar.vue';

describe('NavigationBar.vue', () => {
  it('Should has h1 heading with correct text', () => {
    const wrapper = mount(NavigationBar);
    expect(wrapper.find('[data-test=navigation-heading]').text()).toBe('Where in the world?');
  });
});
