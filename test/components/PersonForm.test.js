import { mount } from '@vue/test-utils';
import PersonForm from '@/components/PersonForm';

const mockGet = jest.fn().mockReturnValue(new Promise((resolve) => {
  resolve({
    data: { value: 'my custom joke' },
  });
}));

const mockGetFail = jest.fn().mockRejectedValue(new Error('custom error'));

function factory(propsData = {}, axiosMethods = {}) {
  return mount(PersonForm, {
    propsData: {
      ...propsData,
    },
    mocks: {
      $axios: {
        get: mockGet,
        ...axiosMethods,
      },
    },
  });
}

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe('PersonForm', () => {
  describe('computed', () => {
    it('should return the greeting', () => {
      wrapper = factory();
      expect(wrapper.vm.greeting).toContain('Welcome');
    });
  });

  describe('methods', () => {
    it('should fetch a joke', async () => {
      wrapper = factory();
      await wrapper.vm.onGetJoke();
      expect(wrapper.vm.jokeText).not.toEqual('');
    });

    it('should handle the error', async () => {
      wrapper = factory({}, { get: mockGetFail });
      await wrapper.vm.onGetJoke();
      expect(wrapper.vm.showError).toEqual(true);
    });
  });
});
