import axios from 'axios'
import { environment } from '@/environments/environment'
import {CREDIT, USER} from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    getUsers() {
      const data = axios({
        method: 'GET',
        url: `${environment.propApi + USER}/getAllUsers`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)
      return data
    },
    putUsers(_, payload) {
      const data = axios({
        method: 'PUT',
        url: `${environment.propApi + USER}/editUser/${payload.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          name: payload.username,
          password: payload.password,
          phoneNumber: payload.phoneNumber
        }
      }).then(r => r)
      return data
    }
  },
}
