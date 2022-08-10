import { createLocalVue, shallowMount } from "@vue/test-utils";
import NavHeader from "@/components/NavHeader.vue";
import Vuex from "vuex";
// import Vue from 'vue'
const localVue = createLocalVue();

localVue.use(Vuex);
describe("NavHeader.vue testing", () => {
  let mutations;
  let store;
  let mockData = {
    status: "edit",
  };
  beforeEach(() => {
    mutations = {
      addNewStatus: jest.fn(),
    };
    store = new Vuex.Store({
      mutations,
    });
  });

  it("call function addNewStatus", async () => {
    const wrapper = shallowMount(NavHeader, { store, localVue });
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(mutations.addNewStatus).toBeCalledWith({}, mockData.status);
  });
});
