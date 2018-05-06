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
    shopIsReferencedByItem: (state) => (id) => {
      if (state.items.find(item => item.shop_id === id)) {
        return true
      }
      return false
    },
    shopIsReferenced: (state) => (id) => {
      if (state.discounts.find(discount => discount.shop_id === id)) {
        return true
      }
      if (state.items.find(item => item.shop_id === id)) {
        return true
      }
      return false
    },
    getGratanList: (state, getter) => {
      var gratanList = []
      for (var item of state.items) {
        var discounts = state.discounts.filter(discount => discount.shop_id === item.shop_id)
        for (var discount of discounts) {
          var shop = getter.getShopById(discount.shop_id)
          var price = (shop.taxIncluded) ? item.price : Number(item.price) * ((100.0 + Number(state.taxRate)) / 100.0)
          price = price - price * (discount.discount1 / 100)
          price = price - price * (discount.discount2 / 100)
          price = price - price * (discount.discount3 / 100)
          var point1 = price * (discount.point1 / 100)
          var point2 = price * (discount.point2 / 100)
          var point3 = price * (discount.point3 / 100)
          price = price - (point1 + point2 + point3)
          console.log(item.amount)
          var gratan = Math.floor((price / item.amount * 1000.0)) / 10
          gratanList.push({name: item.name, shop: getter.getShopById(item.shop_id).name, discount: discount.name, price: item.price, amount: item.amount, gratan: gratan})
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
    updateTax (state, tax) {
      state.taxRate = tax
      localStorage.setItem('gratan', JSON.stringify(state))
    },
    initializeStore (state) {
      console.log('initializeStore called')
      if (localStorage.getItem('gratan')) {
      // objectのrefrenceへ置き換える
      // var storage = JSON.parse(localStorage.getItem('gratan'))
      // var shops = new Map(storage.shops.map((i) => [i.id, i]))
      // for (var discount of storage.discounts) {
      //   discount.shop = shops.get(discount.shop.id)
      // }
      //  Object.assign(state, JSON.parse(localStorage.getItem('gratan')))
      }
    }
  }
})
