import Vue from 'vue'
import Router from 'vue-router'
import Discount from '@/components/Discount'
import Shop from '@/components/Shop'
import Menu from '@/components/Menu'
import Item from '@/components/Item'
import List from '@/components/List'
import Tax from '@/components/Tax'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/discount',
      name: 'discount',
      component: Discount
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/tax',
      name: 'Tax',
      component: Tax
    }
  ]
})
