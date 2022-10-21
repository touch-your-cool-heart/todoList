import type { RouteLocationNormalized } from 'vue-router'
import { getCookie } from '@/utils/cookie'

export const beforeEachFunction = (to: RouteLocationNormalized) => {
  // const cookie = getCookie('isAuthenticated')
  // if (!cookie && to.name !== 'login') {
  //   return { name: 'login' }
  // }
}
