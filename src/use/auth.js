import axios from 'axios'
import { environment } from '@/environments/environment'
import { getToken, removeToken, setToken } from '@/helpers/helpers'
import router from '@/router'

export async function useAuth(form) {
  try {
    await axios({
      method: 'post',
      url: `${environment.authAPI}/demo/auth`,
      headers: {},
      data: {
        username: form.email,
        password: form.password,
      },
    }).then(res => {
      if (res.data.token) {
        setToken(res.data.token)
        router.push({ name: 'dashboard' })
      }
    })
      // eslint-disable-next-line no-shadow,consistent-return
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log(error.message)
        }
      })
  } catch (e) {
    console.log(e.message)
  }
}

export function logOut() {
  removeToken()
  router.push({ name: 'pages-login' })
}

export function decodeJWT() {
  const base64Url = getToken().split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''))

  return JSON.parse(jsonPayload)
}
