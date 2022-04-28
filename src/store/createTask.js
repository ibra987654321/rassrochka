import axios from 'axios'

import { environment } from '@/environments/environment'
import { API_V1 } from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    postTask({ commit }, option) {
      try {
        axios({
          method: 'POST',
          url: `${environment.authAPI + API_V1}/add/new`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          data: {
            comments: option.comments,
            createDate: option.createDate,
            deleted: option.deleted,
            expirationDate: option.expirationDate,
            id: option.id,
            myTask: option.myTask,
            status: option.status,
            task: option.task,
            userName: option.userName,
          },
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
