import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

export const defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const requestSuccessFunc = (config: AxiosRequestConfig) => {
  return config
}

export const requestFailFunc = (error: any) => {
  Promise.reject(error)
}

const SUCCESS_CODE = 0
const MESSAGE = 'errDesc'
export const responseSuccessFunc = (response: AxiosResponse) => {
  const { data } = response
  if (data.error === SUCCESS_CODE) {
    return data
  } else {
    message.error(data[MESSAGE])
  }
}

export const responseFailFunc = (error: any) => {
  Promise.reject(error)
}
