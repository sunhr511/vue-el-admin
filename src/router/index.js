import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import sysconfig from '@/sysconfig'
const superAdmin = sysconfig.userArr[0]['role']
const channelAdmin = sysconfig.userArr[1]['role']
const financeAdmin = sysconfig.userArr[2]['role']
// console.error(superAdmin)
// console.error(channelAdmin)
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/project'
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/list',
    name: 'project',
    meta: { access: [channelAdmin, superAdmin, financeAdmin], title: '项目管理' },
    children: [
      {
        path: 'list',
        name: 'project-list',
        component: () => import('@/views/project/list.vue'),
        meta: { title: '项目列表', icon: 'project' }
      },
      {
        hidden: true,
        path: 'detail/:id/:name/:type',
        name: 'project-detail',
        component: () => import('@/views/project/detail.vue'),
        meta: { title: '项目设置', icon: 'example' }
      }
    ]
  }
]
export const asyncRouterMap = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { access: [superAdmin], title: '订单管理' },
    children: [
      {
        path: 'list',
        name: 'orderlist',
        component: () => import('@/views/order/list.vue'),
        meta: { title: '订单列表', icon: 'order' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/uVaild',
    name: 'user',
    meta: { access: [superAdmin], title: '员工管理', icon: 'users' },
    children: [
      {
        path: 'uVaild',
        name: 'uVaild',
        component: () => import('@/views/user/vaild.vue'),
        meta: { title: '员工列表' }
      },
      {
        path: 'uInVaild',
        name: 'uInVaild',
        component: () => import('@/views/user/invaild.vue'),
        meta: { title: '禁用列表' }
      },
      {
        path: 'addUser',
        name: 'addUser',
        component: () => import('@/views/user/add.vue'),
        meta: { title: '添加员工' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

