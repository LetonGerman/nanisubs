import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/Gallery'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
