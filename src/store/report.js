import axios from 'axios'
import { environment } from '@/environments/environment'
import { PROFILES, USER } from '@/helpers/endpionts'
import { useISOString } from '@/use/ISOStringDate'
import { getToken } from '@/helpers/helpers'

export default {
  state: {
    loading: false,
  },
  mutations: {
  },
  actions: {
    getReportingByDate(store) {
      store.state.loading = true
      return axios(`${environment.propApi + PROFILES}/monthPaymentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data:
          {
            end: useISOString(store.rootState.end),
            paymentTypeList: store.rootState.paymentTypeList.length === 0 ? store.rootState.paymentType : store.rootState.paymentTypeList,
            salesmanLoginList: store.rootState.selectedUser.length === 0 ? store.rootState.userList : store.rootState.selectedUser,
            start: useISOString(store.rootState.start),
          },
      })
        .then(r => {
          store.state.loading = false
          return r.data
        })
        .finally(() => store.state.loading = false)
    },
    getReportingZeroPayment(store) {
      store.state.loading = true
      return axios(`${environment.propApi + PROFILES}/zeroPaymentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data:
          {
            end: useISOString(store.rootState.end),
            paymentTypeList: store.rootState.paymentTypeList.length === 0 ? store.rootState.paymentType : store.rootState.paymentTypeList,
            salesmanLoginList: store.rootState.selectedUser.length === 0 ? store.rootState.userList : store.rootState.selectedUser,
            start: useISOString(store.rootState.start),
          },
      })
        .then(r => {
          store.state.loading = false
          return r.data
        })
        .finally(() => store.state.loading = false)
    },
    getUserList({ state }) {
      const data = axios(`${environment.propApi + USER}/getUsersList`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => {
        state.userList = r
        return r.data
      })

      return data
    },
  },
  getters: {
  },
  modules: {},
}
