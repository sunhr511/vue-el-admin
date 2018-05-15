import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
// request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    // console.error(response)
    if (res.success !== true) {
      Message({
        message: res.errorMessage,
        type: 'error',
        duration: 5 * 1000
      })

      // status: 20006:登录失效;
      if (res.status === 20006) {
        MessageBox.confirm('你已被登出，点击“确定”重新登录', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: false,
          callback: action => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          },
          type: 'warning'
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
