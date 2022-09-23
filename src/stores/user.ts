import { defineStore } from 'pinia'
import { useTodoListStore } from '@/stores/todolist'
import type { userType } from '@/type/store'

export const useUserStore = defineStore('user', {
  state: () => ({
    userList: [] as userType[]
  }),
  actions: {
    // 注册账号
    register (account: string, password: string) {
      if (this.userList.some(v => v.account === account)) return false
      this.userList.push({ account, password, list: [] })
      return true
    },
    // 检查账号是否存在
    match (account: string, password: string) {
      const index = this.userList.findIndex(v => v.account === account && v.password === password)
      if (index === -1) return false
      const todolistStore = useTodoListStore()
      todolistStore.list = this.userList[index].list
      return true
    }
  },
  persist: true
})