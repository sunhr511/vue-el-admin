import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.access判断是否与当前用户权限匹配
 * @param roleArr
 * @param route
 * @param userid // 针对财务
 */
function hasPermission(roleArr, route, userid) {
  if (route.meta && route.meta.access) {
    if (userid === 99) {
      return roleArr.some(role => route.meta.access.includes(userid))
    } else {
      return roleArr.some(role => route.meta.access.includes(role))
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roleArr
 */
function filterAsyncRouter(asyncRouterMap, roleArr, userid) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roleArr, route, userid)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roleArr, userid)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      const roleArr = [parseInt(data.roles)]
      return new Promise(resolve => {
        let accessedRouters
        if (roleArr.includes(1) && data.userid !== 99) { // 如果是管理员权限 而且不是财务
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roleArr, data.userid)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
