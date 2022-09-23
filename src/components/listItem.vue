<template>
  <div :class="['list-item', checked ? 'done-bg' : '']">
    <Checkbox v-model:checked="checked" @change="handleChange" />
    <Input v-model:value="content" @focus="handleFocus" @blur="handleBlur" />
    <span class="del pointer"></span>
    <delete-outlined class="pointer" @click="handleDelete" />
  </div>
</template>

<script lang="ts" setup>
import { Input, Checkbox, message } from 'ant-design-vue'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/checkbox/style/css'
import 'ant-design-vue/lib/message/style/css'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { toRefs } from 'vue'
import { useTodoListStore } from '@/stores/todolist'

const todoListStore = useTodoListStore()

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
const { id, done: checked, content } = toRefs(toRefs(props).info.value as any)
// 点击复选框
const handleChange = () => {
  todoListStore.modify(id.value, checked.value, content.value)
}
// 修改内容为空处理
let initialValue = ''
const handleFocus = () => {
  initialValue = content.value
}
const handleBlur = () => {
  if (content.value.trim() === '') {
    message.warning('内容不能为空')
    content.value = initialValue
  }
}
// 删除
const handleDelete = () => {
  todoListStore.del(id.value)
}
</script>

<style lang="less" scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  height: 32px;
  background-color: #fff;
  .ant-input {
    height: 24px;
    margin: 0 10px;
    border: none;
    border-radius: 5px;
  }
}
.done-bg {
  background-color: #e6e6e6;
  opacity: .5;
  .ant-input {
    background: #e6e6e6;
  }
}
</style>
