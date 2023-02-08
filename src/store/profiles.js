import axios from 'axios'
import { environment } from '@/environments/environment'
import { DEVICE, OWNER, PROFILES } from '@/helpers/endpionts'
import {
  getToken,
  removeObject1,
  removeObject2,
  removeProfileId,
  setProfileId,
  setStep,
} from '@/helpers/helpers'
import moment from 'moment'

export default {
  state: {
    profileId: '',
    doneCard: false,
    loading: false,
  },
  mutations: {
    changeProfiles(state, data) {
      state.profileId = data
      setProfileId(data.id)
    },
  },
  actions: {
    getAllProfiles(store) {
      store.state.loading = true
      const data = axios(`${environment.propApi + PROFILES}/getDtoForMain/${moment(store.rootState.start).format().slice(0, 19)}/${moment(store.rootState.end).format().slice(0, 19)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => {
        store.state.loading = false
        return r.data
      }).finally(() => store.state.loading = false)
      return data
    },
    editProfile(_, payload) {
      const data = axios(`${environment.propApi + PROFILES}/editProfiles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...payload,
        },
      }).then(r => r.data)
      return data
    },
    searchProfilesByName({ state }, name) {
      state.loading = true
      const data = axios(`${environment.propApi + PROFILES}/getDtoForMainByFullName/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(r => {
        state.loading = false
        return r.data
      }).finally(() => state.loading = false)
      return data
    },
    postForm1({commit}, option) {
      return axios(`${environment.propApi + PROFILES}/addProfiles`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option
        },
      }).then(r => {
        commit('changeProfiles', r.data)
        return r.data
      })
        .catch(e => {
          return e
        })
    },
    postForm3({ state, commit }, option) {
      return axios(`${environment.propApi + DEVICE}/addDevice`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option,
        },
      }).then(data => {
        setStep(1)
        return data.data
      })
        .catch(e => e)
    },
    postForm4(store, option) {
      axios(`${environment.propApi + OWNER}/addDeviceOwner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...option
        },
      }).then(r => r)
    },
    deleteProfileBefore({ commit }, id) {
      axios(`${environment.propApi + PROFILES}/deleteById/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(() => {
        removeObject2()
        removeObject1()
        removeProfileId()
        setStep(1)
        window.location.reload()
        commit('setSnackbars', 'Успешно все удалено')
      })
        .catch(e => commit('setError', e.message))
    },
    repeat() {
      removeObject2()
      removeObject1()
      removeProfileId()
      setStep(1)
      window.location.reload()
    },
  },
}
