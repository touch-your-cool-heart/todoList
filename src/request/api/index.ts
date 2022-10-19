import eWeLink from './modules/eWeLink'
import todolist from './modules/todolist'
import type { ApiType } from '@/type/api'

export default {
  ...eWeLink,
  ...todolist
} as Record<string, ApiType>

