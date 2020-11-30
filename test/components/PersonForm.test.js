import { shallowMount } from '@vue/test-utils';
import PersonForm from '@/components/PersonForm';

function factory(propsData = {}) {
  return shallowMount(PersonForm, {
    propsData: {
      ...propsData,
    },
  });
}

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe('PersonForm tests', () => {
  describe('computed tests', () => {
    it('should return the greeting', () => {
      wrapper = factory();
      expect(wrapper.vm.greeting).toContain('Welcome');
    });
  });
});
