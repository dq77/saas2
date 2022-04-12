import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { summaryRedLineList } from '../../components/redline/config'
export default ({ processId }) => {
  const { customer: { stratify: { redCountByProcessId } } } = ajaxStore
  const state = reactive({
    redlineData: [],
    companyCount: 0,
    redlineNum: 0
  })
  const { loading, doResult } = useAsync({
    init: false,
    request: redCountByProcessId,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        // 获取红线触发次数
        state.redlineData = []
        summaryRedLineList.forEach((item, index) => {
          if (data && Object.keys(data).includes(`${item.key}`)) {
            state.redlineData.push({
              name: item.label,
              count: data[item.key]
            })
          } else {
            state.redlineData.push({
              name: item.label,
              count: undefined
            })
          }
        })
      }
    }
  })

  return {
    loading,
    doResult,
    ...toRefs(state)
  }
}
