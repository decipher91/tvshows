import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import { createTestingPinia } from "@pinia/testing";
import ShowList from "../ShowList.vue";

global.fetch = vi.fn()

function createFetchResponse(data: any) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

describe('ShowList', () => {

  it('renders correctly with show images when loading is false', async () => {

    const mockShows = [
      { show: { id: 1, image: { medium: 'image1.jpg' } } },
      { show: { id: 2, image: { medium: 'image2.jpg' } } },
    ];

    fetch.mockResolvedValue(createFetchResponse(mockShows))

    const wrapper = mount(ShowList, {
        global: {
          plugins: [
              createTestingPinia({
                initialState: {
                  loadingStore: [{loading: false}],
                },
                stubActions: false,
                createSpy: vi.fn,
              }),
            ],
        },
      });

    expect(wrapper.find('.gallery-title').exists()).toBe(true);
    expect(wrapper.find('.gallery-container').exists()).toBe(true);

    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(false);
  });
});
