import axios from 'axios'
import { environment } from '@/environments/environment'
import { API_V1 } from '@/helpers/endpionts'
import { getToken } from '@/helpers/helpers'

export default {
  state: {},
  mutations: {},
  actions: {
    getInfo() {
      const data = axios(`${environment.authAPI + API_V1}/file/allFiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => r.data)

      return data
    },
    downloadFile(_, payload) {
      axios(`${environment.authAPI + API_V1}/file/downloadByName/${ payload }`, {
        method: 'GET',
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => {
        const fileURL = window.URL.createObjectURL(new Blob([r.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', payload);
        document.body.appendChild(fileLink);

        fileLink.click();
      })
    },
    deleteFile(_, payload) {
      axios(`${environment.authAPI + API_V1}/file/deleteByName/${ payload }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
    },
    uploadCommand(_, formData) {
      const data = axios.post(`${environment.authAPI + API_V1}/file/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      ).then(r => r.data)

      return data
    },
    uploadFile(_, formData) {
      const data = axios.post(`${environment.authAPI + API_V1}/file/uploadOneFile`,
      formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      ).then(r => r.data)

      return data
    },
    putFile({ commit }, payload) {
      axios(`${environment.authAPI + API_V1}/file/editFileById/{id}?id=${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...payload
        },
      }).catch(error => {
        commit('setError', error.response.data.status)
      })
    },
  },
  modules: {},
}
