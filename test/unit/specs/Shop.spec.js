import { mount } from 'avoriaz'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Shop from '@/components/Shop'
import VueI18n from 'vue-i18n'
import { store } from '../../../src/store/store.js'

Vue.use(Vuetify)
Vue.use(VueI18n)

const data = require('../../../src/i18n/message.json')

const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

describe('Shop.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Shop, {i18n, store})
    expect(wrapper.text())
      .to.contain('検索')
    expect(wrapper.text())
      .to.contain('名前')
    expect(wrapper.text())
      .to.contain('税')
    expect(wrapper.text())
      .to.contain('操作')
  })
  it('adds a new shop', async () => {
    // build component
    const wrapper = mount(Shop, {i18n, store})
    expect(wrapper.vm.dialog).equal(false)
    wrapper.find('button#new')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.dialog).equal(true)
    const input = wrapper.find('input#shop_name')[0]
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'AEON'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).equal(true)
  })
})
