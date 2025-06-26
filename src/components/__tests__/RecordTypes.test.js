import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RecordTypes from '../RecordTypes.vue';

// MOCK ICON COMPONENT
vi.mock('@/components/Icon.vue', () => ({
  default: {
    name: 'Icon',
    props: ['name', 'size', 'strokeWidth'],
    template: '<div class="icon-mock" data-name="{{name}}"></div>'
  }
}));

describe('RecordTypes.vue', () => {
  it('renders record types correctly', () => {
    const recordTypes = [
      { title: 'Password', icon: 'Lock', selected: false },
      { title: 'Document', icon: 'File', selected: true },
      { title: 'Image', icon: 'Image', selected: false }
    ];

    const wrapper = mount(RecordTypes, {
      props: {
        recordTypes
      }
    });

    const items = wrapper.findAll('li');
    expect(items.length).toBe(3);
  });

  it('toggles selection when clicked', async () => {
    const recordTypes = [
      { title: 'Password', icon: 'Lock', selected: false }
    ];

    const wrapper = mount(RecordTypes, {
      props: {
        recordTypes
      }
    });

    await wrapper.find('li').trigger('click');

    expect(recordTypes[0].selected).toBe(true);

    await wrapper.find('li').trigger('click');

    expect(recordTypes[0].selected).toBe(false);
  });
});
