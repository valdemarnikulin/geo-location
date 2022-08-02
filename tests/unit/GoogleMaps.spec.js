import { mount } from '@vue/test-utils'
import GoogleMaps from '@/components/GoogleMaps.vue'


describe('MessageList.vue testing', () => {
    // const vueInstance = createLocalVue();
    const wrapper = mount(GoogleMaps, {
    //   vueInstance,
      propsData: {}
    })

    // it('inizialized correctly', () => {
    //     expect(wrapper.isVueInstance()).toBe(true)
    //     expect(wrapper.is(GoogleMaps)).toBe(true)
    //   })
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        expect(wrapper.text()).toMatch(msg)
      })
})