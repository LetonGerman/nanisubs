import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
