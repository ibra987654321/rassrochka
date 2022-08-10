import axios from 'axios'
import { environment } from '@/environments/environment'
import {
  PROFILES, USER,
} from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'
import { useISOString } from '@/use/ISOStringDate'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    getReportingByDate(store) {
      const data = axios(`${environment.propApi + PROFILES}/getReportingByDate/${useISOString(store.rootState.start)}/${useISOString(store.rootState.end)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return data
    },
    getReportingByDateAndUserName(store, userName) {
      const data = axios(`${environment.propApi + PROFILES}/getReportingByDateAndUserName/${useISOString(store.rootState.start)}/${useISOString(store.rootState.end)}/${userName}`, {
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
