import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import profiles from '@/store/profiles'
import detail from '@/store/detail'
import callProfile from '@/store/callProfile'

import { environment } from '@/environments/environment'
import { setToken } from '@/helpers/helpers'
import router from '@/router'
import userController from '@/store/userController'
import report from '@/store/report'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    start: new Date(),
    end: new Date(Date.now()),
    error: '',
    snackbars: {
      snackbar: false,
      text: '',
      timeout: 10,
    },
    dialog: {
      dialog: false,
      title: '',
      text: '',
      routeName: '',
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error
      state.snackbars.snackbar = true
      state.snackbars.text = error
      state.snackbars.timeout = 1000
    },
    setSnackbars(state, text) {
      state.snackbars.snackbar = true
      state.snackbars.text = text
      state.snackbars.timeout = 3000
    },
  },
  actions: {
    login({ commit }, payload) {
      return axios(`${environment.propApi}/login/auth`, {
        method: 'POST',
        data: {
          ...payload,
        },
      })
        .then(res => {
          if (res.data.token) {
            setToken(res.data.token)
            router.push({ name: 'dashboard' })
          }
        })
        .catch(error => {
          commit('setError', error.response.status)
        })
    },
  },
  getters: {
    error: state => state.error,
    createdDate(state) {
      return state.start.setHours(state.start.getHours() - 20)
    },
  },
  modules: {
    profiles,
    detail,
    callProfile,
    userController,
    report,
  },
})
