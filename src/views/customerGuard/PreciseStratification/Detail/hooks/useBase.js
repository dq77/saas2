import { reactive, toRefs } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'

export default ({baseList = [], n = 2}) => {
  const state = reactive({
    baseList: deepCopy(baseList),
    result: [],
  })
  for (let i = 0; i < state.baseList.length; i++) {
    state.result.push(state.baseList.slice(i, i + n))
    i = i + n - 1
  }
  return {
    ...toRefs(state),
  }
}
