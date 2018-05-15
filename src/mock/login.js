const userMap = {
  admin: {
    backcolor: 'blueviolet',
    id: 1,
    jyp: 1,
    role: 1,
    status: 10000,
    success: true,
    typ: 1
  },
  finance: {
    backcolor: 'blueviolet',
    id: 99,
    jyp: 1,
    role: 1,
    status: 10000,
    success: true,
    typ: 1
  }
}

export default {
  loginByUsername: config => {
    const params = JSON.parse(config.body)
    if (userMap[params.username]) {
      return userMap[params.username]
    }
    return {
      errorCode: 'LOGIN_ERROR_PASSWORD_INCORRECT',
      errorMessage: '用户名或密码错误(管理员帐密为：admin)',
      status: 10006,
      success: false
    }
  },
  encodePCInfor: () => {
    return {
      data: {
        username: '加密后的username',
        password: '加密后的password'
      },
      status: 10000,
      success: true
    }
  },
  logout: () => 'success'
}
