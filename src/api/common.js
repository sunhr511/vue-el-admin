import request from '@/utils/request'

// 用户名 密码加密码
export function encodePCInfor(data) {
  return request({
    url: '/encodePCInfor.reg',
    method: 'post',
    data
  })
}
