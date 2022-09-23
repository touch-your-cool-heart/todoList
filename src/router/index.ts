import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeEachFunction } from '@/config/routerConfig'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/logIn.vue')
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../views/todoList.vue')
    }
  ]
})

router.beforeEach(beforeEachFunction)

export default router
