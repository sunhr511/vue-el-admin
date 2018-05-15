import request from '@/utils/request'
const api = {}

export function list(params) {
  return request({
    url: '/listPcAccount.reg',
    method: 'post',
    params
  })
}

export function edit(data) {
  return request({
    url: '/updatePcAccount.bg',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/insertPcAccount.bg',
    method: 'post',
    data
  })
}

export default api
