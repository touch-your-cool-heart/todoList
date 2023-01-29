<template>
  <div :class="['list-item', checked ? 'done-bg' : '']">
    <a-checkbox v-model:checked="checked" @change="handleChange" />
    <a-input v-model:value="content" @focus="handleFocus" @press-enter="handleEnter" ref="inputElement" />
    <!-- <span class="del pointer"></span> -->
    <delete-outlined class="del pointer" @click="handleDelete" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
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
const inputElement = ref<HTMLElement>()
const handleFocus = () => {
  initialValue = content.value
}
const handleEnter = () => {
  inputElement.value?.blur()
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
