import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import HomeView from "../HomeView.vue";

describe("HomeView.vue", () => {
  it("renders a list of categories", () => {
    const categories = ["Drama", "Comedy", "Children", "Action", "Romance"];
    const wrapper = mount(HomeView, {
      global: {
        props: { categories },
        plugins: [
          createTestingPinia({
            initialState: {
              loadingStore: [{ loading: false }],
            },
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });

    expect(wrapper.findAllComponents({ name: "ShowList" })).toHaveLength(
      categories.length,
    );

    categories.forEach((category) => {
      const showListComponent = wrapper.findComponent({
        name: "ShowList",
        props: { category },
      });
      expect(showListComponent.exists()).toBe(true);
    });
  });
});
