import { ref } from '@vue/composition-api'
import { environment } from '@/environments/environment'
import { useFetch } from './fetch'

// eslint-disable-next-line import/prefer-default-export
export function useUsers() {
  const loaded = ref(false)
  const { response: users, request } = useFetch(`${environment.exampleAPI}/ЮГ2/2021-11-01/2021-11-10`, {
    method: 'GET',
  })

  if (!loaded.value) {
    request()
      .then(r => r)
    loaded.value = true
  }

  return { users }
}
