import Cookies from 'js-cookie'

const User = 'UserProfile'
const TokenKey = 'UserToken'
const Role = 'UserRole'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {
  const _role = Cookies.get(Role)
  return _role ? Number(_role) : 0
}

export function setRole(role) {
  return Cookies.set(Role, role)
}

export function removeRole() {
  return Cookies.remove(Role)
}

export function getProfile() {
  return JSON.parse(window.sessionStorage.getItem(User))
}

export function setProfile(profile) {
  window.sessionStorage.setItem(User, JSON.stringify(profile))
}

export function removeProfile() {
  return window.sessionStorage.removeItem(User)
}
