import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import router from './router'
require('firebase/auth')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    pepes: []
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setIsAuthenticated (state, payload) {
      state.isAuthenticated = payload
    }
  },
  actions: {
    userLogin ({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user)
          commit('setIsAuthenticated', true)
          router.push({ name: 'Dashboard' })
        })
    },
    userSignOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          router.push({ name: 'Home' })
        })
        .catch(() => {
          commit('setUser', null)
          commit('setIsAuthenticated', false)
          router.push({ name: 'Home' })
        })
    }
  },

  getters: {
    isAuthenticated (state) {
      return state.user !== null && !state.user !== undefined
    }
  }
})
