import axios from 'axios'
import { environment } from '@/environments/environment'
import { BROTHER, PROFILES } from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    getCallProfile() {
      const data = axios({
        method: 'GET',
        url: `${environment.propApi + PROFILES}/findCallProfile`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(r => r.data)
      return data
    },
    getBrothersById(_, id) {
      const data = axios({
        method: 'GET',
        url: `${environment.propApi + BROTHER}/getBrothersById/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(r => r.data)
      return data
    },
  },
}
