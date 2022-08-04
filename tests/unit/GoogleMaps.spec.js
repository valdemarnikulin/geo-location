import {  createLocalVue, shallowMount } from '@vue/test-utils'
import GoogleMaps from '@/components/GoogleMaps.vue'
import Vuex from "vuex"
// import Vue from 'vue'
const localVue = createLocalVue()

localVue.use(Vuex)
describe('GoogleMaps.vue testing', () => {
      let mutations
      let store
      let methods
   let  mockData = {
coords: [],
isDisabled: false,
name:""
    }
      beforeEach(() => {
        mutations = {
            addNewStatus: jest.fn(),
        },
        methods = {
          goToArea:jest.fn()
        },
        store = new Vuex.Store({
            mutations
        })
      })
    
      it('dispatches "actionInput" when input event value is "input"', async () => {
        const wrapper = shallowMount(GoogleMaps, { store, localVue })
        const button = wrapper.find('input')
        await button.trigger('click')
        expect(methods.goToArea).toBeCalledWith({},mockData)
      })
  })