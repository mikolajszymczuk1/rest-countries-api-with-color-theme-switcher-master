import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DarkModeButton from '@/components/buttons/DarkModeButton.vue';

describe('DarkModeButton.vue', () => {
  it('When component is created, should set default values for component data and localStorage', () => {
    const wrapper = mount(DarkModeButton);
    expect(wrapper.vm.isDarkModeActive).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('When component is clicked, should add dark class to root html element and update dark mode status in localStorage', async () => {
    const wrapper = mount(DarkModeButton);
    await wrapper.find('[data-test=dark-mode-button]').trigger('click');
    expect(wrapper.vm.isDarkModeActive).toBe('true');
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
    await wrapper.find('[data-test=dark-mode-button]').trigger('click');
    expect(wrapper.vm.isDarkModeActive).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});
