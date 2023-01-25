import axios from "axios";
import {environment} from "@/environments/environment";
import { BROTHER, CREDIT, DEVICE, OWNER, PROFILES} from "@/helpers/endpionts";
import {
  getToken,
  removeObject1,
  removeObject2,
  removeProfileId,
  setProfileId,
  setStep,
} from '@/helpers/helpers'

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
    getAllProfiles({ state }, payload) {
      state.loading = true
      const data = axios(`${environment.propApi + PROFILES}/getDtoForMain/${payload.start}/${payload.end}`, {
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
      axios(`${environment.propApi + PROFILES}/addProfiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...option
        },
      }).then(r => {
        commit('changeProfiles', r.data)
      })
    },
    postForm3({ state, commit }, option) {
      axios(`${environment.propApi + DEVICE}/addDevice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: {
          ...option,
        },
      }).then(() => {
        state.doneCard = true
        setStep(1)
        removeProfileId()
        removeObject2()
      })
        .catch(e => commit('setError', e.message))
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
