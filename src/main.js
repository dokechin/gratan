// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueI18n from 'vue-i18n'
import { store } from './store/store.js'

Vue.use(Vuetify)
Vue.use(VueI18n)

const data = require('./i18n/message.json')

const language = (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage
// 言語の設定
const i18n = new VueI18n({
  locale: language.substring(0, 2),
  messages: data
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  i18n: i18n,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    this.$store.commit('initializeStore')
  }
})
