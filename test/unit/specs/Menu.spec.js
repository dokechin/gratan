import { mount } from 'avoriaz'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Menu from '@/components/Menu'
import VueI18n from 'vue-i18n'

Vue.use(Vuetify)
Vue.use(VueI18n)

const data = require('../../../src/i18n/message.json')

const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

describe('Menu.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Menu, {i18n})
    expect(wrapper.text())
      .toContain('割引/ポイント')
    expect(wrapper.text())
      .toContain('軽快な操作性')
    expect(wrapper.text())
      .toContain('PWA')
  })
})
