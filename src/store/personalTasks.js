import axios from 'axios'
import { environment } from '@/environments/environment'
import { API_V1 } from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

const { decodeJWT } = require('@/use/auth')

export default {
  state: {},
  mutations: {},
  actions: {
    getCountTask(data, common) {
      // eslint-disable-next-line no-undef
      const users = axios(`${environment.authAPI + API_V1}/task/dash${common}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return users
    },
    getPersonalTask() {
      // eslint-disable-next-line no-undef
      const tasks = axios(`${environment.authAPI + API_V1}/username/${decodeJWT().sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return tasks
    },
    getCheckListTask(commit, payload) {
      // eslint-disable-next-line no-undef
      const users = axios(`${environment.authAPI + API_V1}/checklist/getCheckListByTaskId/${payload}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return users
    },
    deleteTask(data, taskId) {
      axios(`${environment.authAPI + API_V1}/username/${decodeJWT().sub}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
    },
    deleteCheckList(data, taskId) {
      axios(`${environment.authAPI + API_V1}/checklist/deleteCheckListById/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
    },
    putTask(data, option) {
      axios(`${environment.authAPI + API_V1}/username/${decodeJWT().sub}/${option.id}`, {
        method: 'PUT',
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
          statusType: option.status,
          task: option.task,
          userName: decodeJWT().sub,
        },
      })
    },
    postTasks(data, option) {
      axios(`${environment.authAPI + API_V1}/add/new`, {
        method: 'POST',
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
          statusType: option.status,
          task: option.task,
          userName: decodeJWT().sub,
        },
      })
    },
    putCheckList(data, option) {
      axios(`${environment.authAPI + API_V1}/checklist/updateCheckList/${option.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          id: option.id,
          status: option.status,
          taskCheckList: option.taskCheckList,
          taskId: option.taskId,
        },
      })
    },
    postTCheckList(data, option) {
      axios(`${environment.authAPI + API_V1}/checklist/newCheckList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: option,
      })
    },
  },
  modules: {},
}
