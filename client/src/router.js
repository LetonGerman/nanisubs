import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/Gallery'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Gallery
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/Dashboard')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    },
    {
      path: '/logout',
      name: 'Logout'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.name === 'Dashboard')) {
    if (!store.state.isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
