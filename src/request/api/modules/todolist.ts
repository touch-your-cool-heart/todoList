const prefix = '/todolists'

export default {
  register: {
    method: 'post',
    url: `${prefix}/user/register`,
    desc: '注册'
  },
  login: {
    method: 'post',
    url: `${prefix}/user/login`,
    desc: '登录'
  },
  add: {
    method: 'post',
    url: `${prefix}/todolist/add`,
    desc: '添加'
  },
  delete: {
    method: 'post',
    url: `${prefix}/todolist/delete`,
    desc: '删除'
  },
  modify: {
    method: 'post',
    url: `${prefix}/todolist/modify`,
    desc: '修改'
  },
  query: {
    method: 'get',
    url: `${prefix}/todolist/query`,
    desc: '查询'
  }
}
