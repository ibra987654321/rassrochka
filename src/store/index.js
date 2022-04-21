import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import table from '@/store/table'
import createTask from '@/store/createTask'
import personalTasks from '@/store/personalTasks'
import GSKO from '@/store/GSKO/GSKO'
import { environment } from '@/environments/environment'
import { STATISTICS_CREATED,
  STATISTICS_INCIDENTS_CREATED,
  TICKETS
} from '@/helpers/endpionts'
import { setToken } from '@/helpers/helpers'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    start: new Date(),
    end: new Date(Date.now()),
    error: '',
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    login({ commit }, payload) {
      const login = axios(`${environment.authAPI}/demo/auth`, {
        method: 'POST',
        data: {
          username: payload.email,
          password: payload.password,
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
  },
})
