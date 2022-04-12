import { reactive, toRefs } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'

export default ({baseList = [], n = 3}) => {
  const state = reactive({
    baseList: deepCopy(baseList),
    result: [],
  })
  for (let i = 0; i < state.baseList.length; i += n) {
    state.result.push(state.baseList.slice(i, i + n))
  }
  return {
    ...toRefs(state),
  }
}
