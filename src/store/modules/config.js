import { list as projectList } from '@/api/project'

const config = {
  state: {
    projectArr: [] // 项目对象集合
  },

  mutations: {
    SET_PROJECT_ARR: (state, value) => {
      state.projectArr = value
    }
  },

  actions: {
    // 设置项目对象
    SetProjectArr({ commit }, params) {
      return new Promise((resolve, reject) => {
        projectList(params).then(response => {
          if (response.success === true) {
            commit('SET_PROJECT_ARR', response.data)
          } else {
            reject('SetProjectArr: the port boomed 0_0 !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default config
