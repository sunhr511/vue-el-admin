import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    index: i,
    id: '@increment',
    'backcolor|1': ['blueviolet', 'brown', 'burlywood', 'dimgrey', 'cornflowerblue'],
    jyp: '@integer(0, 1)',
    typ: '@integer(0, 1)',
    password: '@string("lower", 6, 12)',
    realname: '@cname',
    role: '@integer(1, 2)',
    status: '@integer(1, 2)',
    username: /^1[385][1-9]\d{8}/
  }))
}

export default {
  // 获得用户列表
  listPcAccount: config => {
    let { pageNo = 1, pageSize = 20, status = 2 } = param2Obj(config.url)
    let pageList = []
    let total = 0
    const realname = param2Obj(config.url).relname
    pageNo = parseInt(pageNo)
    pageSize = parseInt(pageSize)
    status = parseInt(status)
    if (realname) {
      if (parseInt(status) === 0) {
        pageList = List.filter((item, index) => (item.realname).includes(realname))
      } else {
        pageList = List.filter((item, index) => item.status === status && (item.realname).includes(realname))
      }
    } else {
      if (parseInt(status) === 0) {
        pageList = List
      } else {
        pageList = List.filter((item, index) => item.status === status)
      }
    }
    total = pageList.length
    pageList = pageList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
    return {
      list: pageList,
      pageNo,
      pageSize,
      pages: parseInt(total / pageSize),
      status: 10000,
      success: true,
      total
    }
  },

  // 更新用户状态
  updatePcAccount: config => {
    const params = JSON.parse(config.body)
    // pcId 用户ID
    // status 1: 启用、2: 禁用
    const { pcId = '', status = '', pwd = '', relname = '', username = '' } = params
    pcId
    status
    pwd
    relname
    username
    const info = List[List.filter(item => item.id === pcId)[0].index] // 要改的用户
    const usernameInfo = List.filter(item => item.username === username) // 如果找到了说明有用户用了这个帐号的，所以是不能用的
    if (usernameInfo.length && usernameInfo.id !== info.id) {
      return {
        errorCode: 'PCUSER_EXIST',
        errorMessage: '该帐号已被注册',
        status: 600005,
        success: false
      }
    }
    if (status) {
      info['status'] = status
    }
    if (pwd) {
      info['pwd'] = pwd
    }
    if (relname) {
      info['realname'] = relname
    }
    if (username) {
      info['username'] = username
    }
    return {
      status: 10000,
      success: true
    }
  },

  // 插入用户
  insertPcAccount: config => {
    const params = JSON.parse(config.body)
    const { password = '', realname = '', role = '', username = '' } = params
    const usernameInfo = List.filter(item => item.username === username) // 如果找到了说明有用户用了这个帐号的，所以是不能用的
    if (usernameInfo.length) {
      return {
        errorCode: 'PCUSER_EXIST',
        errorMessage: '该帐号已被注册',
        status: 600005,
        success: false
      }
    }
    List.push(Mock.mock({
      index: List.length,
      id: '@increment',
      'backcolor|1': ['blueviolet', 'brown', 'burlywood', 'dimgrey', 'cornflowerblue'],
      jyp: '@integer(0, 1)',
      typ: '@integer(0, 1)',
      password: password,
      realname: realname,
      role: role,
      status: 1,
      username: username
    }))
    return {
      status: 10000,
      success: true
    }
  }
}
