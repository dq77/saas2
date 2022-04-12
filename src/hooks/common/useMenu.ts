// 获取菜单信息
import usePermisssions from './usePermisssions'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { open, menuTypes } from '@/consts/app'
import { deepCopy } from '@/utils/qjd'
import store from '@/store'

export interface submenuTypes {
  menuTag: string;
  name: string;
  permissionCode: string;
  subMenu: Array<submenuTypes> | null;
  [key: string]: any;
}

export interface menusTypes {
  [key: string]: Array<Partial<submenuTypes>>
}

export default ({ permissions }: { permissions: object }) => {
  // ajax
  const { common: { getMenuData } } = ajaxStore
  // store
  const { commit } = store
  // usePermisssions
  const { setMenuPermissions } = usePermisssions()
  // 获取此单信息接口
  const { doResult: getMenu } = useAsync({
    request: getMenuData,
    init: false,
    callback: (res: any) => {
      const { code, data } = res?.data ?? {}
      // 存储菜单权限
      setMenuPermissions(data, permissions)
      const newData: menusTypes = data ? deepCopy(data) : <menusTypes>{}
      // 将数据处理为符合需求数据
      Object.keys(newData).forEach(key => { newData[key] = [{ subMenu: newData[key] as Array<submenuTypes> }] })
      // 处理开放平台数据
      const newOpen: Array<menuTypes> = deepCopy(open)
      newOpen[0].subMenu.forEach(item => { item.isHidden = !permissions[item.permissionCode] })
      // 手动塞入开发平台数据
      newData.open = newOpen

      return {
        code,
        data: newData,
        // 作为判断应用权限数据
        appPermissions: data
      } as any
    },
    successCallBack: ({ code, data, appPermissions }) => {
      // 存储菜单数据
      code === '0' && commit('SET_MENUDATA', data ?? {})
      // 存储应用级别权限
      code === '0' && commit('SET_APPPERERMISSIONS', appPermissions ?? {})
    }
  })

  return {
    getMenu
  }
}
