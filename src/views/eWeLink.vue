<template>
  <h2>eWeLink</h2>
  <div class="center-wrapper">
    <a-button type="primary" @click="login">登录</a-button>
    <br>
    <a-button type="primary" @click="getDevices">获取设备</a-button>
    <div class="list" v-for="item in list" :key="item.index">
      <span>type: {{ item.itemType }}</span>;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>name: {{ item.itemData.name }}</span>;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>online: {{ item.itemData.online }}</span>
    </div>
    <br>
    <a-button type="primary" @click="longConnect">建立长连接</a-button>
    <br>
    <a-button type="primary" @click="updateDevice">更新设备状态</a-button>
    <br>
    <a-button type="primary" @click="closeWebsocket">断开连接</a-button>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { $http } from '@/request'
import { appid } from '@/config/global.config'

// 登录
const login = async () => {
  const params = {
    countryCode: '+86',
    phoneNumber: '+8615779068738',
    password: 'qwe123ASD'
  }
  const { data: { at, user: { apikey } } } = await $http('eWeLinklogin', params)
  localStorage.setItem('accessToken', at)
  localStorage.setItem('apikey', apikey)
}
// 设备列表
const list = ref()
const getDevices = async () => {
  const { data: { thingList } } = await $http('getDevice')
  list.value = thingList
}
// websocket连接
const ws = ref<WebSocket>()
const hbInterval = ref(90)
const timer = ref<number>()
const longConnect = async () => {
  const { port, domain } = await $http('dispatch')
  const url = `wss://${domain}:${port}/api/ws`
  ws.value = new WebSocket(url)
  ws.value.addEventListener('open', () => {
    console.log('open: ', '连接成功')
    const params = {
      action: 'userOnline',
      at: localStorage.getItem('accessToken'),
      apikey: localStorage.getItem('apikey'),
      appid,
      nonce: 'qwe123hd',
      userAgent: 'app',
      sequence: Date.now(),
      version: 8
    }
    ws.value?.send(JSON.stringify(params))
  })
  ws.value.addEventListener('message', (e) => {
    const data = e.data === 'pong' ? 'pong' : JSON.parse(e.data)
    console.log('message: ', data)
    if (data.config && data.config.hbInterval) {
      hbInterval.value = data.config.hbInterval
    }
    clearInterval(timer.value)
    timer.value = setInterval(() => {
      ws.value?.send('ping')
    }, (hbInterval.value - 7) * 1000)
  })
  ws.value.addEventListener('error', () => {
    message.error('WebSocket error')
  })
  ws.value.addEventListener('close', () => {
    clearInterval(timer.value)
  })
}
const updateDevice = () => {
  const { online, deviceid } = list.value[0].itemData
  if (!online) {
    message.warning('设备离线')
  } else {
    const params = {
      action: 'update',
      deviceid,
      apikey: localStorage.getItem('apikey'),
      userAgent: 'app',
      sequence: Date.now(),
      params: {
        switches: [
          { switch: 'on', outlet: 0 },
          { switch: 'on', outlet: 1 },
          { switch: 'on', outlet: 2 },
          { switch: 'on', outlet: 3 }
        ]
      }
    }
    ws.value?.send(JSON.stringify(params))
  }
}
const closeWebsocket = () => {
  ws.value?.close()
  clearInterval(timer.value)
}
onUnmounted(closeWebsocket)
</script>

<style lang="less" scoped>
h2 {
  margin: 20px 0;
  text-align: center;
}
.center-wrapper {
  text-align: center;
  .ant-btn {
    margin-bottom: 20px;
  }
  .list {
    margin-bottom: 20px;
  }
}
</style>
