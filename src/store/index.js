import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import table from '@/store/table'
import createTask from '@/store/createTask'
import personalTasks from '@/store/personalTasks'
import GSKO from '@/store/GSKO/GSKO'
import { environment } from '@/environments/environment'
import { STATISTICS, TICKETS } from '@/helpers/endpionts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    start: new Date(),
    end: new Date(Date.now()),
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
    GetAllTickets(store) {
      const tickets = axios(`${environment.testAPI + TICKETS}all/${store.state.start.toISOString().slice(0, 19)}/${store.state.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return tickets
    },
    GetThreeMonths() {
      const monthly = axios(`${environment.testAPI + STATISTICS}created/three-months`, {
        method: 'GET',
      }).then(r => r.data)

      return monthly
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
