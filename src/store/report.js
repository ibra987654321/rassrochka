import axios from 'axios'
import { environment } from '@/environments/environment'
import { PROFILES, USER } from '@/helpers/endpionts'
import { useISOString } from '@/use/ISOStringDate'
import { getToken } from '@/helpers/helpers'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    getReportingByDate(store) {
      return axios(`${environment.propApi + PROFILES}/monthPaymentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data:
          {
            end: useISOString(store.rootState.end),
            paymentTypeList: [
              store.rootState.paymentTypeList,
            ],
            salesmanLoginList: [
              store.rootState.selectedUser,
            ],
            start: useISOString(store.rootState.start),
          },
      })
        .then(r => r.data)
    },
    getReportingZeroPayment(store) {
      return axios(`${environment.propApi + PROFILES}/zeroPaymentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data:
          {
            end: useISOString(store.rootState.end),
            paymentTypeList: [
              store.rootState.paymentTypeList,
            ],
            salesmanLoginList: [
              store.rootState.selectedUser,
            ],
            start: useISOString(store.rootState.start),
          },
      })
        .then(r => r.data)
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
