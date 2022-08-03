
import { mount, createLocalVue } from '@vue/test-utils'
import MessageList from '@/components/MessageList.vue'
// import {getData} from '@/api/MessageList';

const mockData = {
  channelId: '123f',
  loadMoreBtnText: 'Load more',
  httpResponse: {
data:{
  items: []
      }
                 }
}

describe('MessageList.vue testing', () => {
  const vueInstance = createLocalVue();
  const wrapper = mount(MessageList, {
    vueInstance,
    propsData: {
      channelId: mockData.channelId,
      loadMoreBtnText: mockData.loadMoreBtnText
    }
  })

  
  it('inizialized correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.is(MessageList)).toBe(true)
  })


  it('renders props.msg when passed', () => {
    const msg = 'new message'
    expect(wrapper.text()).toMatch(msg)
  })


  it('renders props when passed', () => {
expect(wrapper.props().channelId).toBe(mockData.channelId)
expect(wrapper.props().loadMoreBtnText).toBe(mockData.loadMoreBtnText)
  })

  // it('fetches data', async () => {
  //   const data = await getData();
  //   expect(data.data[0]).toBeInstanceOf(Object)
  // })
})
