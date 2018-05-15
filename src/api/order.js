import request from '@/utils/request'
const api = {}

export function list(data) {
  return request({
    url: '/selectPCShoppintOrder.bg',
    method: 'post',
    data
  })
}

export default api
