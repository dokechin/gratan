import Vue from 'vue'
import Router from 'vue-router'
import Play from '@/components/Play'
import Setting from '@/components/Setting'
import Menu from '@/components/Menu'
import Register from '@/components/Register'
import Entrance from '@/components/Entrance'
import Ending from '@/components/Ending'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/entrance',
      name: 'Entrance',
      component: Entrance
    },
    {
      path: '/ending',
      name: 'Ending',
      component: Ending
    }
  ]
})
