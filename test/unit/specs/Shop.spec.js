import { mount } from 'avoriaz'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Shop from '@/components/Shop'
import VueI18n from 'vue-i18n'
import { store } from '../../../src/store/store.js'
require('jest-localstorage-mock')

Vue.use(Vuetify)
Vue.use(VueI18n)

const data = require('../../../src/i18n/message.json')

const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

function _clickNewButton(wrapper){
  wrapper.find('button#new')[0].trigger('click')  
}

function _clickEditButton(wrapper){
  wrapper.find('button')[3].trigger('click')
}

function _clickZeikomiCheck(wrapper){
  const flag = wrapper.find('.input-group--selection-controls__ripple')[0]
  flag.trigger('click')
}

function _inputName(wrapper, name){
  const inputShopName = wrapper.find('input#shopName')[0]
  inputShopName.trigger('focus')
  inputShopName.element.value = name
  inputShopName.trigger('input')
}

function _clickSave(wrapper){
  wrapper.find('button#save')[0].trigger('click')
}

describe('Shop.vue', () => {
  localStorage.clear()
  it('should render correct contents', () => {
    console.log("test")
    const wrapper = mount(Shop, {i18n, store})
    expect(wrapper.text()).toContain('検索')
    expect(wrapper.text()).toContain('名前')
    expect(wrapper.text()).toContain('税')
    expect(wrapper.text()).toContain('操作')
  })
  it('adds a new shop', async () => {
    // build component
    const wrapper = mount(Shop, {i18n, store})
    expect(wrapper.vm.dialog).toBe(false)
    _clickNewButton(wrapper)
    expect(wrapper.vm.dialog).toBe(true)
 //    _clickZeikomiCheck(wrapper)
    _inputName(wrapper, 'AEON')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formValid).toBe(true)
    _clickSave(wrapper)
    await wrapper.vm.$nextTick()
    expect(store.state.shops[0].name).toBe('AEON')
    expect(store.state.shops[0].taxIncluded).toBe(true)
    expect(wrapper.html()).toContain('AEON')
    expect(wrapper.html()).toContain('税込')
  })
//  it('edits a shop', async () => {  
    // build component
//    const wrapper2 = mount(Shop, {i18n, store})
//    expect(wrapper2.vm.dialog).toBe(false)
//    _clickEditButton(wrapper2)
//    expect(wrapper2.vm.dialog).toBe(true)
//    console.log(wrapper2.html())
//    _clickZeikomiCheck(wrapper2)
//    _inputName(wrapper2, 'SAYYOU')
//    await wrapper2.vm.$nextTick()
//    expect(wrapper2.vm.formValid).toBe(true)
//    _clickSave(wrapper2)
//    await wrapper2.vm.$nextTick()
//    expect(store.state.shops[0].name).toBe('SAYYOU')
//    expect(store.state.shops[0].taxIncluded).toBe(false)
//    expect(wrapper2.html()).toContain('SAYYOU')
//    expect(wrapper2.html()).toContain('税抜')
//  })
})
