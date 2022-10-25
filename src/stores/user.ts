import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    account: '',
    userId: ''
  }),
  persist: true
})