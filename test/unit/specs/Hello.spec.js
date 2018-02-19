import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('v-btn').textContent)
      .to.contain('読み上げ')
      expect(vm.$el.querySelector('v-btn:last-child').textContent)
      .to.contain('もう一度')
  })
})
