import axios from 'axios'
import { environment } from '@/environments/environment'
import { API_V1 } from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    getInfo() {
      const users = axios(`${environment.authAPI + API_V1}/task/allActiveTask`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return users
    },
  },
  modules: {},
}
