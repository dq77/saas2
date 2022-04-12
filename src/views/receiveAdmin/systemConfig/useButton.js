import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'

export default ({
  api,
  params = {}
}) => {
  // state
  const state = reactive({
    list: [], // 全量列表
    defaultList: [], // 默认列表
    customizeList: [], // 自定义列表
    chooseList: [] // 选中列表
  })
  // initValue
  const initList = (data) => {
    // init
    const list = data
    const defaultList = []
    const customizeList = []
    const chooseList = []
    data && data.forEach(item => {
      item.disabled = item.dictStatus === '1' || false
      if (item.dictType === '1') {
        defaultList.push(item)
      }
      if (item.dictType === '2') {
        customizeList.push(item)
      }
      if (item.dictStatus === '1') {
        chooseList.push(item)
      }
    })
    return { list, defaultList, customizeList, chooseList }
  }
  // 获取按钮配置字典
  const { loading, doResult } = useAsync({
    init: false,
    isLoading: true,
    request: api,
    params: params,
    successCallBack: res => {
      const { data } = res ?? {}
      const { list, defaultList, customizeList, chooseList } = initList(data)
      state.list = list
      state.defaultList = defaultList
      state.customizeList = customizeList
      state.chooseList = chooseList
    }
  })

  return {
    loading,
    ...toRefs(state),
    doResult,
    initList
  }
}
