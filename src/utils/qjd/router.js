// 处理router信息，获取扁平化router信息
export const getRoutesInfo = (routes) => {
  if (!routes) return {}
  // 存储路由信息，menuTag为key
  const menuRoutes = {}

  const selfReduce = (routes, parent = null) => {
    routes.forEach(item => {
      const { name, meta, path, children } = item ?? {}
      const { crumbs, menuTag, hasMenuTag } = meta ?? {}
      // 判断path是否以/开通
      const isXie = path?.[0] === '/'
      // 给父级噻完整url
      item.fullPath = `${parent?.fullPath ?? ''}${path ? isXie ? path : '/' + path : ''}`
      if (hasMenuTag) {
        menuRoutes[menuTag] = { path, fullPath: `${parent?.fullPath ?? ''}${path ? isXie ? path : '/' + path : ''}`, name, crumbs, menuTag }
      }
      // 存在子级，递归
      children && selfReduce(children ?? [], item)
    })
  }

  selfReduce(routes)

  return {
    menuRoutes
  }
}
