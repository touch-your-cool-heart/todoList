import type { RouteLocationNormalized } from 'vue-router'

export const beforeEachFunction = (to: RouteLocationNormalized) => {
  if (!localStorage.getItem('access_token') && to.name !== 'login') {
    return { name: 'login' }
  }
}
