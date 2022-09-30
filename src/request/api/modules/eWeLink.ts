import type { ApiType } from '@/type/api'

const prefix = '/api'

export default {
  eWeLinklogin: {
    method: 'post',
    url: `${prefix}/v2/user/login`,
    auth: 'sign',
    desc: '登录',
    takeAppid: true
  },
  getCode: {
    method: 'post',
    url: `${prefix}/v2/user/verification-code`,
    auth: 'sign',
    desc: '发送验证码',
    takeAppid: true
  },
  getUserInfo: {
    method: 'get',
    url: `${prefix}/v2/user/profile`,
    auth: 'accessToken',
    desc: '获取用户信息',
    takeAppid: true
  },
  getDevice: {
    method: 'get',
    url: `${prefix}/v2/device/thing`,
    auth: 'accessToken',
    desc: '获取设备列表'
  },
  dispatch: {
    method: 'get',
    url: '/dispatch/app',
    desc: '分配服务'
  }
} as Record<string, ApiType>
