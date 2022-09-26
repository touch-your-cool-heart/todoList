<template>
  <header class="head">
    <div class="head-content">
      <div class="logo">ToDoList</div>
      <a-input v-model:value="addContent" placeholder="添加ToDo" @press-enter="handleAddContent" />
    </div>
    <!-- 用户 -->
    <div class="personal">
      <span class="userName pointer ellipsis" :title="userName">{{ userName }}</span>
      <span class="exit pointer" @click="handleExit">退出</span>
    </div>
  </header>
  <div class="center">
    <!-- 搜索栏 -->
    <a-input class="search" v-model:value="searchContent" placeholder="Search" allowClear />
    <!-- list -->
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ListItem from '@/components/listItem.vue'
import { useTodoListStore } from '@/stores/todolist'
import { getCookie, removeCookie } from '@/utils/cookie'

const todoListStore = useTodoListStore()
const router = useRouter()

const userName = getCookie('userName')
const searchContent = ref('')
const addContent = ref('')
const { list } = storeToRefs(todoListStore)
const searchList = computed(() => {
  const reg = new RegExp(['', ...searchContent.value.trim(), ''].join('.*'))
  return list.value.filter(v => reg.test(v.content))
})
const undoneList = computed(() => searchList.value.filter(v => !v.done))
const doneList = computed(() => searchList.value.filter(v => v.done))
// 添加todo项
const handleAddContent = () => {
  const str = addContent.value.trim()
  if (!str) return
  todoListStore.add(Date.now(), str)
  addContent.value = ''
}
// 退出
const handleExit = () => {
  // localStorage.removeItem('isAuthenticated')
  removeCookie(['userName', 'isAuthenticated'])
  router.push({ name: 'login' })

}
</script>

<style lang="less" scoped>
.head {
  position: relative;
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
  .personal {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .userName {
      width: 100px;
      text-align: right;
    }
    .exit {
      margin-left: 10px;
      font-size: 14px;
      color: red;
    }
  }
}
.center {
  width: 600px;
  margin: 0 auto;
  .search {
    margin-top: 20px;
    font-size: 18px;
    border-radius: 5px;
  }
  .list-wrapper {
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
}
</style>
