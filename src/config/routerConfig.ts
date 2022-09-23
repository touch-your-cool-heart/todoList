import type { RouteLocationNormalized } from 'vue-router'

export const beforeEachFunction = (to: RouteLocationNormalized) => {
  if (!localStorage.getItem('isAuthenticated') && to.name !== 'login') {
    return { name: 'login' }
  }
}
