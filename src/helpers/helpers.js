export const getToken = () => localStorage.getItem('token')

export const setToken = token => {
  localStorage.setItem('token', token)
}
export const removeToken = () => {
  localStorage.removeItem('token')
}
export const getDarkTheme = () => localStorage.getItem('dark_theme')
export const setDarkTheme = theme => {
  localStorage.setItem('dark_theme', theme)
}
export const Role = {
  Admin: 'ROLE_ADMIN',
  User: 'ROLE_USER',
}

export const getObject1 = () => JSON.parse(localStorage.getItem('objectItem1'))

export const setObject1 = obj => {
  localStorage.setItem('objectItem1', JSON.stringify(obj))
}
export const removeObject1 = () => {
  localStorage.removeItem('objectItem1')
}
export const getObject2 = () => JSON.parse(localStorage.getItem('objectItem2'))

export const setObject2 = obj => {
  localStorage.setItem('objectItem2', JSON.stringify(obj))
}
export const removeObject2 = () => {
  localStorage.removeItem('objectItem2')
}

export const getStep = () => JSON.parse(localStorage.getItem('step'))

export const setStep = step => {
  localStorage.setItem('step', JSON.stringify(step))
}
export const removeStep = () => {
  localStorage.removeItem('step')
}

export const getProfileId = () => JSON.parse(localStorage.getItem('profileId'))

export const setProfileId = step => {
  localStorage.setItem('profileId', JSON.stringify(step))
}
export const removeProfileId = () => {
  localStorage.removeItem('profileId')
}
