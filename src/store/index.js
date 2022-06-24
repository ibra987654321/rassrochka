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
import { STATISTICS_CREATED,
  STATISTICS_INCIDENTS_CREATED,
  TICKETS
} from '@/helpers/endpionts'
import { setToken } from '@/helpers/helpers'
import router from '@/router'
import userController from "@/store/userController";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    start: new Date(),
    end: new Date(Date.now()),
    error: '',
    snackbars: {
      snackbar: false,
      text: '',
      timeout: 10,
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error
      state.snackbars.snackbar = true
      state.snackbars.text = error
      state.snackbars.timeout = 1000
    },
  },
  actions: {
    login({ commit }, payload) {
      const login = axios(`${environment.propApi}/login/auth`, {
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
    GetAllTickets(store) {
      const tickets = axios(`${environment.testAPI + TICKETS}all/${store.state.start.toISOString().slice(0, 19)}/${store.state.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return tickets
    },
    GetThreeMonths() {
      const monthly = axios(`${environment.testAPI + STATISTICS_CREATED}/three-months`, {
        method: 'GET',
      }).then(r => r.data)

      return monthly
    },
    GetIncidentsThreeMonth(_) {
      const data = axios(`${environment.testAPI + STATISTICS_INCIDENTS_CREATED}/three-months`, {
        method: 'GET',
      }).then(r => r.data)
      return data
    },
    getCallsIndicators(store) {
      const lustDate = new Date(new Date(store.state.end).setDate(new Date(store.state.end).getDate() - 1)).toISOString().substr(0, 10)
      const data = axios(`${environment.bekaApi + CALLS_INDICATORS + lustDate}`, {
        method: 'GET',
      }).then(r => r.data)
      return data
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
    userController
  },
})
