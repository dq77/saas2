// 各个应用跳转逻辑
import Router, { menuRoutes } from '@/router'
import { submenuTypes } from './useMenu'
import { appTypes } from '@/consts/app'
import store from '@/store'
import { findDefaultMenu } from '@/utils/qjd'
import useRedirect from '../supplyChain/useRedirect'

export default () => {
  // store
  const { state, commit } = store
  // 默认应用跳转规则
  const defaultJump = (key: string): void => {
    if (!key) return
    const menu: submenuTypes = state.appPermissions?.[key]?.[0] ?? {}
    const current = findDefaultMenu(menu)
    // current或menuTag不存在 说明路由中没有对应的路由
    !current?.menuTag && console.warn('未找到对应路由')
    Router.push({ name: current?.menuTag ? menuRoutes?.[current?.menuTag]?.name : '' })
  }
  // 跳转
  const jumpHandle = (item: appTypes): void => {
    // redirectHandle
    const { redirectHandle } = useRedirect({ defaultJump })
    if (!item) return
    // 订货大师自定义跳转
    if (item.name === 'supplyChain') {
      redirectHandle()
      return
    }
    commit('SET_CURRENTAPP', item?.key)
    // 开放平台跳转逻辑
    if (item.key === 'open') {
      const menu = state.appPermissions?.[1] ?? []
      const current = menu?.find(item => item.menuTag === 'open_platform') ?? {}
      const firstChild = current?.subMenu?.find(item => state?.permissions?.[item?.permissionCode])
      Router.push({ name: menuRoutes?.[firstChild?.menuTag]?.name ?? '' })
      return
    }
    // 跳转应用，defaultRedirect表示默认跳转策略，否则直接跳转
    if (item.defaultRedirect) {
      defaultJump(item?.key)
    } else {
      Router.push({ name: item?.name })
    }
  }

  return {
    defaultJump,
    jumpHandle
  }
}
