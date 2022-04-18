import { ref } from '@vue/composition-api'
import axios from 'axios'
import { getToken } from '@/helpers/helpers'

// eslint-disable-next-line import/prefer-default-export
export function useFetch(url, options) {
  const response = ref()
  const httpOption = {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }),
  }

  const request = async () => {
    const res = await axios(url, httpOption, options)
    response.value = await res
  }

  return { response, request }
}
