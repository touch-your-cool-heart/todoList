import { any, number } from "vue-types"

export interface apiType {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  auth?: 'sign' | 'accessToken'
  takeAppid?: boolean
  desc?: string
}
