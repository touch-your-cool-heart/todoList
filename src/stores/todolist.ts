import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todolist', {
  state: () => ({
    list: [] as { id: number; content: string; done: boolean }[]
  }),
  actions: {
    add (id: number, content: string) {
      this.list.unshift({ id, done: false, content })
    },
    del (id: number) {
      const index = this.list.findIndex(v => v.id === id)
      this.list.splice(index, 1)
    },
    modify (id: number, done: boolean, content: string) {
      const index = this.list.findIndex(v => v.id === id)
      this.list[index].done = done
      this.list[index].content = content
    }
  },
  persist: true
})
