<template>
  <header class="head">
    <div class="head-content">
      <div class="logo">ToDoList</div>
      <Input v-model:value="addContent" placeholder="添加ToDo" @press-enter="handleAddContent" />
    </div>
  </header>
  <div class="search"></div>
  <div class="list-wrapper">
    <div class="undone">
      <div class="title">
        <h2>正在进行</h2>
        <div class="number">{{ undoneList.length }}</div>
      </div>
      <ListItem v-for="item in undoneList" :key="item.id" :info="item" />
    </div>
    <div class="done">
      <div class="title">
        <h2>已经完成</h2>
        <div class="number">{{ doneList.length }}</div>
      </div>
      <ListItem v-for="item in doneList" :key="item.id" :info="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Input } from 'ant-design-vue'
import 'ant-design-vue/lib/input/style/css'
import ListItem from '@/components/listItem.vue'
import { useTodoListStore } from '@/stores/todolist'

const todoListStore = useTodoListStore()

const addContent = ref('')
const { list } = storeToRefs(todoListStore)
const undoneList = computed(() => list.value.filter(v => !v.done))
const doneList = computed(() => list.value.filter(v => v.done))
// 添加todo项
const handleAddContent = () => {
  const str = addContent.value.trim()
  if (!str) return
  todoListStore.add(Date.now(), str)
  addContent.value = ''
}
</script>

<style lang="less" scoped>
.head {
  width: 100vw;
  height: 50px;
  background: #323232;
  display: flex;
  justify-content: center;
  &-content {
    max-width: 600px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 24px;
      color: #fff;
    }
    .ant-input {
      width: 60%;
      border-radius: 5px;
    }
  }
}
.list-wrapper {
  width: 600px;
  margin: 0 auto;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    h2 {
      margin-top: 20px;
      font-size: 24px;
      font-weight: 600;
      color: #000;
    }
    .number {
      height: 20px;
      padding: 0 5px;
      font-size: 14px;
      font-weight: 600;
      color: #666;
      background-color: #e6e6fa;
      border-radius: 50%;
    }
  }
}
</style>
