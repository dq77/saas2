import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default () => {
  // state
  const state = reactive({})
  // useAsync
  const { customer: { stratify: { saveAll } } } = ajaxStore

  // 提前跑模型
  const { loading, doResult } = useAsync({
    init: false,
    request: saveAll,
    successCallBack: res => {
      const { code, data } = res
      if (code !== '0') return
      console.log(data)
    }
  })

  return {
    loading,
    doResult,
    ...toRefs(state)
  }
}
