import {  createLocalVue,
   shallowMount 
  } from '@vue/test-utils'
import { OldTasks } from '@/components/Tasks/OldTasks.vue'
import Vuex from "vuex"
const localVue = createLocalVue()

localVue.use(Vuex)
describe('OldTasks.vue testing', () => {
      let mutations
      let store
      let methods
//    let  mockData = {
// status: 'edit'
//     }
      beforeEach(() => {
        mutations = {
          showNewTask: jest.fn(),
        },
        methods = {
          updateDisableBtn:jest.fn()
        },
        store = new Vuex.Store({
            mutations
        })
      })
    it('check function updateDisableBtn', async () => {
      await methods.updateDisableBtn()
      expect(methods.updateDisableBtn).toBeCalled()
    })
      it('dispatches "actionInput" when input event value is "input"', async () => {
        const wrapper = shallowMount(OldTasks, { store, localVue })
        const button = wrapper.find('button')
        await button.trigger('click')
        // expect(mutations.showNewTask).toBeCalledWith({},mockData.status)
        expect(mutations.showNewTask).toBeCalled()
      })
  })