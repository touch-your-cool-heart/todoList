<template>
  <div :class="['list-item', done ? 'done-bg' : '']">
    <a-checkbox :checked="done" @change="handleCheckboxChange" />
    <a-input v-model:value="content" @focus="handleFocus" @blur="handleContentChange" @press-enter="handleContentChange" />
    <span class="del pointer"></span>
    <delete-outlined class="pointer" @click="handleDelete" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { $http } from '@/request'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['change'])

const id = props.info.id
const content = ref(props.info.content)
const done = ref(props.info.done)

// 勾选取消复选框
const handleCheckboxChange = async (e: any) => {
  await $http('modify', { id, content: content.value, done: e.target.checked })
  emit('change')
}
// 修改内容为空处理
let initialValue = ''
const handleFocus = () => {
  initialValue = content.value
}
const handleContentChange = async () => {
  const str = content.value.trim()
  if (str === '') {
    message.warning('内容不能为空')
    content.value = initialValue
  } else if (str === initialValue) {
    content.value = initialValue
  } else {
    try {
      await $http('modify', { id, content: content.value.trim(), done: done.value})
      emit('change')
    } catch (error) {
      content.value = initialValue
    }
  }
}
// 删除
const handleDelete = async () => {
  await $http('delete', { id })
  emit('change')
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
