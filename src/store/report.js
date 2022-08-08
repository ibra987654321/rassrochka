import axios from 'axios'
import { environment } from '@/environments/environment'
import {
  PROFILES, USER,
} from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    getReportingByDate(store) {
      const data = axios(`${environment.propApi + PROFILES}/getReportingByDate/${store.rootState.start.toISOString()}/${store.rootState.end.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return data
    },
    getReportingByDateAndUserName(store, userName) {
      const data = axios(`${environment.propApi + PROFILES}/getReportingByDateAndUserName/${store.rootState.start.toISOString()}/${store.rootState.end.toISOString()}/${userName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return data
    },
    getUserList() {
      const data = axios(`${environment.propApi + USER}/getUsersList`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return data
    },
  },
  getters: {
  },
  modules: {},
}
