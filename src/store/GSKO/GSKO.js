import axios from 'axios'
import { environment } from '@/environments/environment'
import {
  OWNERS, STATISTICS, TICKETS, TITLES,
} from '@/helpers/endpionts'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    AllCreatedTT(store) {
      const AllTT = axios(`${environment.testAPI + TICKETS}created/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return AllTT
    },
    CreatedMonthly(store) {
      const monthly = axios(`${environment.testAPI + STATISTICS}created/monthly/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return monthly
    },
    CreatedDaily(store) {
      const daily = axios(`${environment.testAPI + STATISTICS}created/daily/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return daily
    },
    ClosedDaily(store) {
      const daily = axios(`${environment.testAPI + STATISTICS}closed/daily/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return daily
    },
    CancelledDaily(store) {
      const daily = axios(`${environment.testAPI + STATISTICS}cancelled/daily/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return daily
    },
    GetAllOwners(store, payload) {
      const owners = axios(`${environment.testAPI + OWNERS + payload}/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return owners
    },
    GetAllTitles(store, payload) {
      const owners = axios(`${environment.testAPI + TITLES + payload}/${store.rootState.start.toISOString().slice(0, 19)}/${store.rootState.end.toISOString().slice(0, 19)}`, {
        method: 'GET',
      }).then(r => r.data)

      return owners
    },
  },
  getters: {
  },
  modules: {},
}
