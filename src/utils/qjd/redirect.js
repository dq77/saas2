import Router, { menuRoutes } from '@/router'

export const redirectHandle = path => {
  const key = Object.keys(menuRoutes).find(key => `${menuRoutes[key].fullPath}` === path)
  if (!key) {
    // 未找到前端路径
    Router.push({name: 'temphome'})
    console.warn('路由不存在')
  } else {
    Router.replace({ name: menuRoutes[key]?.name })
  }
}
