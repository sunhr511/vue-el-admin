import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/selectAllpj.bg',
    method: 'post',
    data
  })
}

export function detail(params) {
  return request({
    url: '/listPcAccount.reg',
    method: 'post',
    params
  })
}
