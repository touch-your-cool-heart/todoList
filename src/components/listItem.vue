<template>
  <div :class="['list-item', checked ? 'done-bg' : '']">
    <a-checkbox v-model:checked="checked" @change="handleChange" />
    <a-input v-model:value="content" @focus="handleFocus" @blur="handleBlur" />
    <span class="del pointer"></span>
    <delete-outlined class="pointer" @click="handleDelete" />
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { $http } from '@/request'


const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['change'])
const { _id, done: checked, content } = toRefs(props.info)
// 勾选取消复选框
const handleChange = async () => {
  await $http('modify', { todolistId: _id.value, content: content.value, done: checked.value })
  emit('change')
}
// 修改内容为空处理
let initialValue = ''
const handleFocus = () => {
  initialValue = content.value
}
const handleBlur = async () => {
  const str = content.value.trim()
  if (str === '') {
    message.warning('内容不能为空')
    content.value = initialValue
  } else if (str === initialValue) {
    content.value = initialValue
  } else {
    await $http('modify', { todolistId: _id.value, content: content.value.trim(), done: checked.value })
    emit('change')
  }
}
// 删除
const handleDelete = async () => {
  const { userId } = useUserStore()
  await $http('delete', { userId, todolistId: _id.value })
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
