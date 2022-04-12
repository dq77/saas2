import store from '@/store'
import { rootPrefix } from '@/utils/config'
import { scrollHandle } from '@/utils/qjd'
// utils-router
import { getRoutesInfo } from '@/utils/qjd/router'
import { useTitle } from '@vueuse/core'
import { Message } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
// home
import homeRoutes from './common/home'
import { getModules } from './util'

const Login = () => import(/* webpackChunkName: "group-index" */ '@/views/Login')
const Register = () => import(/* webpackChunkName: "group-index" */ '@/views/register')
const ForgetPassword = () => import(/* webpackChunkName: "group-index" */ '@/views/ForgetPassword')
const page404 = () => import(/* webpackChunkName: "group-index" */ '@/views/404')
// 客户评估 - 我的报告 - 查看报告
const RealEstateReport = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/RealEstateReport/index')
const Layout = () => import(/* webpackChunkName: "group-index" */ '@/layouts/layout/Layout.vue')
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  { path: '/', redirect: { name: 'login' } },
  { path: '/login', redirect: { name: 'login' } },
  { path: `${rootPrefix}`, redirect: { name: 'login' } },
  { path: `${rootPrefix}/login`, name: 'login', component: Login },
  { path: `${rootPrefix}/register`, name: 'register', component: Register },
  { path: `${rootPrefix}/forgetPassword`, name: 'forgetPassword', component: ForgetPassword },
  { path: `${rootPrefix}/404`, name: '404', components: { default: page404 } },
  { path: `${rootPrefix}/realEstateReport`, name: 'realEstateReport', components: { default: RealEstateReport } },
  {
    name: 'main',
    path: `${rootPrefix}`,
    component: Layout,
    redirect: { name: 'temphome' },
    children: [
      ...homeRoutes,
      ...getModules()
    ]
  },
]
// 获取扁平化路由数据
const { menuRoutes } = getRoutesInfo(routes) ?? {}

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.query.hashSelector) {
      return { selector: to.query.hashSelector }
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  routes
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const { state: { menuPermisssions, userInfo, permissions, currentApp, curIdentify } } = store
  const { meta: { menuTag, crumbs, permissionCode }, matched } = to ?? {}
  const { name, query: { redirect } } = from ?? {}
  if (matched.length === 0) {
    next({name: '404'})
    return
  }
  // 设置浏览器标题
  useTitle(crumbs ? `${crumbs[crumbs.length - 1]}-仟金顶` : '仟金顶')
  // 登录态存在状态下不允许直接回到登录页，需通过退出登录
  if (to.name === 'login' && userInfo && Object.keys(userInfo).length) {
    next({ name: 'temphome' })
    return
  }
  // menuTag为菜单标识
  // permissionCode为权限页面标识
  if (menuTag || permissionCode) {
    // 非客户版控制权限跳转，客户无需控制（前提条件后端不会回菜单数据） &  长时间未登录返回登录页重新登录时重定向无需控制权限 & 添加本地环境无需权限控制（方便前端开发）
    if (userInfo?.userType !== 2 && !redirect && process.env.NODE_ENV !== 'development') {
      // 若是当前为订货大师且经销商端不需要权限校验
      if (currentApp === '3' && curIdentify === '2') {
        store.commit('save', { menuTag })
      } else {
        if (menuPermisssions[menuTag] || permissions[permissionCode]) {
          store.commit('save', { menuTag })
        } else {
          if (!name) {
            // 手动输入url且无权限回跳到登录页
            Message.warning('请登录')
            router.replace({ name: 'login' })
          } else {
            Message.warning('暂无权限访问该页面')
            console.warn(`无权限访问该页面，menuTag: ${menuTag}`)
          }
          // next({name: '404'})
          return
        }
      }
    }
  }
  // 内容区重置滚动条
  scrollHandle()
  next()
})

export { menuRoutes }
export default router
