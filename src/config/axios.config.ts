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

export const responseSuccessFunc = (response: AxiosResponse) => {
  const { data } = response
  if (data.error === 0) {
    return data
  } else {
    message.error(data.msg)
    Promise.reject(data.msg)
  }
}

export const responseFailFunc = (error: any) => {
  Promise.reject(error)
}
