/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue } from '@vue/test-utils'
import OldTasks from '@/components/Tasks/OldTasks.vue'
require('jsdom-global')


describe('OldTasks.vue testing', () => {
    const vueInstance = createLocalVue();
    const wrapper = mount(OldTasks, {
      vueInstance,
      propsData: {}
    })

    it('inizialized correctly', () => {
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.is(OldTasks)).toBe(true)
      })
    // it('renders props.msg when passed', () => {
    //     const msg = 'new message'
    //     expect(wrapper.text()).toMatch(msg)
    //   })
})