import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'

export default ({
  init = true,
  request,
  nameKey = 'name',
  resultKey = 'pagedRecords',
  callbackKeys
}) => {
  const state = reactive({
    companyName: '',
    current: null,
    result: []
  })
  // useAsync
  const { loading, doResult } = useAsync({
    init: init,
    request,
    successCallBack: ({ code, data }) => {
      if (code !== '0') return
      const list = data[resultKey].map(item => {
        return { name: item[callbackKeys[0]], value: item[callbackKeys[1]] }
      })
      state.result = list
    }
  })
  /**
   * @description 获取当前选中current
   * @param {string} key 为了获取item[key]
   * @param {any} value 与item[key]进行比得到current
   * @returns
   */
  const doCurrent = (value) => {
    let current = {}
    state.result.forEach(item => {
      if (item.value === value) current = item
    })
    return current
  }
  // 远程搜索
  const remoteMethod = (name) => { doResult({ [nameKey]: name }) }

  return {
    loading,
    doResult,
    doCurrent,
    remoteMethod,
    ...toRefs(state)
  }
}
