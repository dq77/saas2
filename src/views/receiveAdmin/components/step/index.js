import { ref } from '@vue/composition-api'
import router, { menuRoutes } from '@/router'
import store from '@/store'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { list } from './config'
import { Message } from 'element-ui'

export default (id, addHandle) => {
  // ajax
  const { receive: { getGuideList, jumpGuide } } = ajaxStore
  // 是否显示操作指引
  const isShow = ref(true)
  // 存储当前模块数据
  const dataSource = ref([])
  // 菜单权限menuPermisssions
  const { state: { menuPermisssions } } = store
  // 过滤无权限数据
  const getDataSource = () => {
    const data = []
    list.forEach((item, index) => {
      if (menuPermisssions?.[item.menuTag]) {
        data.push(item)
        index < list.length - 1 && data.push({})
      }
    })
    return data
  }
  // 获取权限数据
  useAsync({
    request: getGuideList,
    params: { businessType: 'receivableManager' },
    successCallBack: res => {
      const { code, data } = res ?? {}
      if (code === '0') {
        const newData = {}
        const result = data?.filter(item => {
          const current = item?.children?.[0] ?? {}
          // 收集各步骤状态
          if (current.code) newData[current.code] = current?.flag
          return !current.flag
        }) ?? []
        // 若result长度大于0，则表示有步骤未做过操作指引
        isShow.value = !!result.length
        // 过滤权限后数据
        const permissData = getDataSource() ?? []
        // 设置步骤状态（是否操作过）
        permissData.forEach(item => {
          if (item.code) item.state = newData[item.code]
        })
        // 初始化模块数据
        dataSource.value = permissData ?? []
      }
    }
  })
  // 跳过指引
  const { doResult, loading } = useAsync({
    request: jumpGuide,
    init: false,
    successCallBack: res => {
      const { code } = res ?? {}
      if (code === '0') {
        Message.success('已跳过')
        isShow.value = false
      }
    }
  })
  // 跳转模块
  const jumpHandle = item => {
    if (item.code === 'add_receivable_money') {
      !id && Message.info('请先添加计划')
      id && addHandle()
      return
    }
    router.push({ name: item.pathName ? item.pathName : menuRoutes?.[item?.menuTag]?.name, query: { isGuide: item?.isGuide } })
  }
  // 跳过指引
  const skipHandle = () => doResult({ businessType: 'receivableManager' })

  return {
    isShow,
    loading,
    dataSource,
    jumpHandle,
    skipHandle
  }
}
