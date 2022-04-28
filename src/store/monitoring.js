import axios from "axios";
import {environment} from "@/environments/environment";
import {API_V1, INDICATOR} from "@/helpers/endpionts";
import {getToken} from "@/helpers/helpers";

export default {
  state: {},
  mutations: {},
  actions: {
    getMonitoringData(_, date) {
      const data = axios(`${environment.bekaApi + INDICATOR + date}`, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        // },
      }).then(r => r.data)

      return data
    },
  },
  modules: {},
}
