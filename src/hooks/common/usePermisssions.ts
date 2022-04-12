// 各菜单权限，以menuTag为key
import store from '@/store'
import { menusTypes } from './useMenu'

export default () => {
  // store
  const { commit } = store
  // 获取菜单对应权限，作为路由跳转依据, data：菜单数据、permissions：权限数据
  const setMenuPermissions = (data: menusTypes | null, permissions: object): void | object => {
    const menuPermisssions: object = {}
    if (!data) return menuPermisssions
    const selfReduce = (data): void => {
      data.forEach(item => {
        if (item?.permissionCode) {
          menuPermisssions[item?.menuTag] = permissions[item?.permissionCode]
        }
        if (item?.subMenu) selfReduce(item?.subMenu)
      })
    }
    Object.values(data || {}).forEach(item => selfReduce(item))
    // 存储菜单权限
    commit('SET_MENUPERMISSIONS', menuPermisssions ?? {})
    return menuPermisssions
  }

  return {
    setMenuPermissions
  }
}
