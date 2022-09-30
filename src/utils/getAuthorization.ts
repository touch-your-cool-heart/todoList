import { appSecret } from '@/config/global.config'
import CryptoJS from 'crypto-js'

export const getAuthorization = (params: Record<string, unknown>, authParams: string) => {
  if (authParams === 'accessToken') {
    return `Bearer ${localStorage.getItem('accessToken')}`
  } else {
    const body = JSON.stringify(params)
    const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(body, appSecret))
    return `Sign ${sign}`
  }
}
