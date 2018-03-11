import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    shops: [],
    discounts: [],
    items: [],
    lists: [],
    maxShopId: 1,
    maxDiscountId: 1,
    maxItemId: 1,
    taxRate: 8
  },
  getters: {
    getShopById: (state) => (id) => {
      return state.shops.find(shop => shop.id === id)
    },
    getGratanList: (state, getter) => {
      var gratanList = []
      for (var item of state.items) {
        var discounts = state.discounts.filter(discount => discount.shop_id === item.shop_id)
        for (var discount of discounts) {
          gratanList.push({name: item.name, shop: getter.getShopById(item.shop_id).name, discount: discount.name, price: item.price, amount: item.amount, gratan: (item.price / item.amount)})
        }
      }
      return gratanList
    }
  },
  mutations: {
    addShop (state, shop) {
      shop.id = state.maxShopId++
      state.shops.push(shop)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    updateShop (state, data) {
      Object.assign(state.shops[data.index], data.shop)
      // state.shops.splice(data.index, 1, data.shop)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    removeShop (state, shop) {
      var index = state.shops.indexOf(shop)
      state.shops.splice(index, 1)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    addDiscount (state, discount) {
      discount.id = state.maxDiscountId++
      state.discounts.push(discount)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    updateDiscount (state, data) {
      Object.assign(state.discounts[data.index], data.discount)
      // state.discounts.splice(data.index, 1, data.discount)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    removeDiscount (state, discount) {
      var index = state.discounts.indexOf(discount)
      state.discounts.splice(index, 1)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    addItem (state, item) {
      item.id = state.maxItemId++
      state.items.push(item)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    updateItem (state, data) {
      Object.assign(state.items[data.index], data.item)
      // state.items.splice(data.index, 1, data.item)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    removeItem (state, item) {
      var index = state.discounts.indexOf(item)
      state.items.splice(index, 1)
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    initializeStore (state) {
      if (localStorage.getItem('gratan')) {
      // objectのrefrenceへ置き換える
      // var storage = JSON.parse(localStorage.getItem('gratan'))
      // var shops = new Map(storage.shops.map((i) => [i.id, i]))
      // for (var discount of storage.discounts) {
      //   discount.shop = shops.get(discount.shop.id)
      // }
        Object.assign(state, JSON.parse(localStorage.getItem('gratan')))
      }
    }
  }
})
