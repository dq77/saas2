import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
export default ({request, params}) => {
  const state = reactive({
    relationList: [],
  })
  const getList = (name, count, countAll) => {
    return {
      name,
      count,
      percent: countAll === 0 ? 0 : (count / countAll).toFixed(2)
    }
  }
  const { doResult } = useAsync({
    request,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        state.relationList = []
        data = [1, 2, 3]
        data.forEach((item, index) => {
          state.relationList.push(getList('[0-35]', 30, 30))
        })
      }
    }
  })
  // select触发change获取新数据
  const changeRelation = (newParams) => {
    doResult({...params, ...newParams})
  }
  // 初始化
  doResult(params)

  return {
    changeRelation,
    ...toRefs(state)
  }
}
