import Mock from 'mockjs'
import loginAPI from './login'
import projectAPI from './project'
import orderAPI from './order'
import userAPI from './user'

// 登录相关
Mock.mock(/\/pcLogin.reg/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/encodePCInfor.reg/, 'post', loginAPI.encodePCInfor)

// 项目列表相关
Mock.mock(/\/selectAllpj.bg/, 'post', projectAPI.selectAllpj)

// 订单列表相关
Mock.mock(/\/selectPCShoppintOrder.bg/, 'post', orderAPI.selectPCShoppintOrder)

// 用户列表相关
Mock.mock(/\/listPcAccount.reg/, 'post', userAPI.listPcAccount)
Mock.mock(/\/updatePcAccount.bg/, 'post', userAPI.updatePcAccount)
Mock.mock(/\/insertPcAccount.bg/, 'post', userAPI.insertPcAccount)

export default Mock
