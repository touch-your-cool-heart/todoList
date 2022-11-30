import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { defaultOptions, requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from '@/config/axios.config'
import api from './api'
// import { getAuthorization } from '@/utils/getAuthorization'
// import { appid } from '@/config/global.config'

const getParamsKey = (method: string) => method === 'post' || method === 'put' ? 'data' : 'params'

const instance = axios.create({ timeout: 60000 })

instance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
instance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export const $http = async (path: string, params = {}, options = {}) => {
  // const { url, method, auth, takeAppid } = api[path as keyof typeof api]
  const { url, method } = api[path as keyof typeof api]
  const mergeOption = _.merge(defaultOptions, options, {
    headers: {
      access_token: localStorage.getItem('access_token') || ''
    }
  })
  const requestItem = {
    url,
    method,
    [getParamsKey(method)]: params,
    ...mergeOption
  }
  try {
    const res = await instance(requestItem) as AxiosResponse['data']
    return res
  } catch (error) {
    return Promise.reject(error)
  }
}
