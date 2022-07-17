import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DarkModeButton from '@/components/buttons/DarkModeButton.vue';

describe('DarkModeButton.vue', () => {
  let wrapper;

  // Helpers
  const findDarkModeButton = () => wrapper.find('[data-test=dark-mode-button]');

  // Component factory
  const createComponent = (options = null) => {
    wrapper = mount(DarkModeButton, options);
  };

  it('When component is created, should set default values for component data and localStorage', () => {
    createComponent();
    expect(wrapper.vm.isDarkModeActive).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('When component is clicked, should add dark class to root html element and update dark mode status in localStorage', async () => {
    createComponent();
    await findDarkModeButton().trigger('click');
    expect(wrapper.vm.isDarkModeActive).toBe('true');
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
    await findDarkModeButton().trigger('click');
    expect(wrapper.vm.isDarkModeActive).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});
