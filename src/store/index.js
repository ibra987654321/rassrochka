import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import profiles from "@/store/profiles";
import detail from "@/store/detail";
import callProfile from "@/store/callProfile";

import table from '@/store/table'
import createTask from '@/store/createTask'
import personalTasks from '@/store/personalTasks'
import GSKO from '@/store/GSKO/GSKO'
import Monitoring from "@/store/monitoring";
import { environment } from '@/environments/environment'
import { setToken } from '@/helpers/helpers'
import router from '@/router'
import userController from "@/store/userController";
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
      text:'',
      routeName: ''
    }
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
      state.snackbars.timeout = 2000
    }
  },
  actions: {
    login({ commit }, payload) {
      const login = axios(`${environment.testAPI}/login/auth`, {
        method: 'POST',
        data: {
          ...payload
        },
      }).then(res => {
        if (res.data.token) {
          setToken(res.data.token)
          router.push({name: 'dashboard'})
        }
      }).catch(error => {
        commit('setError', error.response.status)
      })

      return login
    },
  },
  getters: {
    error: state => state.error,
    createdDate(state) {
      return state.start.setDate(state.start.getDate() - 30)
    },
  },
  modules: {
    table,
    createTask,
    personalTasks,
    GSKO,
    Monitoring,
    profiles,
    detail,
    callProfile,
    userController,
    report
  },
})
