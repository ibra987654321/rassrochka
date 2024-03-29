import axios from 'axios'
import { environment } from '@/environments/environment'
import { CREDIT, DEVICE} from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    getInformation(_,  id) {
       const data = axios({
          method: 'GET',
          url: `${environment.propApi + DEVICE}/getDeviceByProfileID/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }).then(r => r)
      return data
    },
    getCreditInformation(_,  id) {
      const data = axios({
        method: 'GET',
        url: `${environment.propApi + CREDIT}/findCreditByDeviceId/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r)
      return data
    },
    putCreditInformation(_,  payload) {
      const data = axios({
        method: 'PUT',
        url: `${environment.propApi + CREDIT}/month/editMontCredit`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...payload
        }
      }).then(r => r)
      return data
    },
    creditBlackList(store,  payload) {
      store.rootState.loading = true
      const data = axios({
        method: 'POST',
        url: `${environment.propApi + CREDIT}/addBlackList`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...payload
        }
      }).then(r => {
         store.rootState.loading = false
        store.commit('setSnackbars', 'Статус успешно изменен')
      }).catch(error => {
         store.rootState.loading = false
        store.commit('setError', error.response.status)
      })
      return data
    },
  },
}
