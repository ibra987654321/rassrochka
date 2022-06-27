import axios from "axios";
import {environment} from "@/environments/environment";
import {API_V1, BROTHER, CREDIT, DEVICE, OWNER, PROFILES} from "@/helpers/endpionts";
import {getToken} from "@/helpers/helpers";
import {decodeJWT} from "@/use/auth";

export default {
  state: {
    profileId: '',
    deviceId: '',
    brother: '',
    doneCard: false
  },
  mutations: {
    changeProfiles(state, data) {
      state.profileId = data
    },
    changeDevice(state, data) {
      state.deviceId = data
    },
    changeBrother(state, data) {
      state.brother = data
    },
  },
  actions: {
    // getAllProfiles(_, payload) {
    //  const data = axios(`${environment.propApi + PROFILES}/findProfileByDate/${payload.start}/${payload.end}`, {
    //     method: 'GET',
    //   }).then(r => r.data)
    //   return data
    // },
    getAllProfiles() {
      const data = axios(`${environment.propApi + PROFILES}/findAll`, {
        method: 'GET',
      }).then(r => r.data)
      return data
    },
    searchProfilesByName(_, name) {
      const data = axios(`${environment.propApi + PROFILES}/findByFullName/${name}`, {
        method: 'GET',
      }).then(r => r.data)
      return data
    },
    searchProfilesByInn(_, inn) {
      const data = axios(`${environment.propApi + PROFILES}/findByPassportInn/${inn}`, {
        method: 'GET',
      }).then(r => r.data)
      return data
    },
    postForm1({commit}, option) {
      axios(`${environment.propApi + PROFILES}/addProfiles`, {
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
      })
    },
    postForm2({commit}, option) {
      axios(`${environment.propApi + BROTHER}/addBrothersDto`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option
        },
      }).then(r => commit('changeBrother', r.data))
    },
    postForm3({commit}, option) {
      axios(`${environment.propApi + DEVICE}/addDevice`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option
        },
      }).then(r => {
        commit('changeDevice', r.data)
      })
    },
    postForm4(store, option) {
      axios(`${environment.propApi + OWNER}/addDeviceOwner`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option
        },
      }).then(r => r)
    },
    postForm5({state, commit}, option) {
      axios(`${environment.propApi + CREDIT}/addCredit`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
        data: {
          ...option
        },
      }).then(r => state.doneCard = true)
        .catch(e => commit('setError', e.message))
    },
  }
}
