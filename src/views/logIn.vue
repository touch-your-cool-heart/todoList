<template>
  <div class="login-wrapper">
    <h2 class="title">ToDoList</h2>
    <a-form :model="formState" ref="form" :rules="rules">
      <a-formItem name="account">
        <a-input v-model:value="formState.account" placeholder="账号" />
      </a-formItem>
      <a-formItem name="password">
        <a-input v-model:value="formState.password" type="password" placeholder="密码" />
      </a-formItem>
      <a-formItem v-if="isInRegister" name="checkPassword">
        <a-input v-model:value="formState.checkPassword" type="password" placeholder="确认密码" />
      </a-formItem>
    </a-form>
    <a-button type="primary" block @click="handleClickBtn">{{ isInRegister ? '注册' : '登录' }}</a-button>
    <span class="register pointer" @click="toggleRegister">{{ isInRegister ? '已有帐号，去登录' : '去注册' }}</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form/interface'
import { useUserStore } from '@/stores/user'
import { getCookie, setCookie } from '@/utils/cookie'
import { $http } from '@/request'

const router = useRouter()

onMounted(() => {
  if (getCookie('isAuthenticated')) {
    router.push({ name: 'todolist' })
  }
})

const form = ref()
const formState = reactive({
  account: '',
  password: '',
  checkPassword: ''
})
const isInRegister = ref(false)
// 校验二次输入密码
const validator = async (rule: RuleObject, value: string) => {
  if (!isInRegister.value) return Promise.resolve()
  if (!value) {
    return Promise.reject('内容不能为空')
  } else if (value !== formState.password) {
    return Promise.reject('两次输入的密码不一致')
  } else {
    return Promise.resolve()
  }
}
// 表单校验规则
const rules: { [k: string]: RuleObject[] } = {
  account: [{ required: true, message: '内容不能为空', trigger: 'blur', type: 'string' }],
  password: [{ required: true, message: '内容不能为空', trigger: 'blur', type: 'string' }],
  checkPassword: [{ validator, trigger: 'blur' }]
}
// 点击登录/注册按钮
const handleClickBtn = async () => {
  await form.value.validate()
  if (isInRegister.value) {
    const { error } = await $http('register', { ...formState })
    if (error === 0) {
      toggleRegister()
      message.success('注册成功')
    }
  } else {
    // const account = userStore.match(formState.account, formState.password)
    // if (!account) {
    //   message.error('账号或密码错误')
    //   return
    // }
    // setCookie('userName', account)
    // setCookie('isAuthenticated', '1')
    const { account, password } = formState
    await $http('login', { account, password })
    router.push({ name: 'todolist' })
  }
}
// 切换注册/登录表单
const toggleRegister = () => {
  formState.account = ''
  formState.password = ''
  formState.checkPassword = ''
  isInRegister.value = !isInRegister.value
}
</script>

<style lang="less" scoped>
.login-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 0 16px 30px;
  background: #fff;
  .title {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #1890ff;
  }
  .ant-form-item {
    margin-bottom: 20px;
  }
  .register {
    display: inline-block;
    margin-top: 5px;
    color: #1890ff;
  }
}
</style>
