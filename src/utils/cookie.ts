import { LOGIN_EFFECTIVE_TIME } from '@/config/global.config'

export const setCookie = (key: string, value: string, timestamp = LOGIN_EFFECTIVE_TIME) => {
  const endDate = new Date(Date.now() + timestamp).toUTCString()
  document.cookie = `${key}=${value};expires=${endDate}`
}

export const getCookie = (key: string) => {
  const cookieArr = document.cookie.split(';')
  for (const val of cookieArr) {
    const value = val.trim()
    if (value.indexOf(key) === 0) {
      return value.slice(key.length + 1)
    }
  }
  return ''
}

export const removeCookie = (keys: string[]) => {
  keys.forEach(key => {
    setCookie(key, '', -1)
  })
}