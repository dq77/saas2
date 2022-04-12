import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function ({
  params = {},
  listData
}) {
  const state = reactive({
    listData: [],
  })
  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getSumReceivables,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        listData[0].content = res.data?.sumIncomeNumber
        listData[1].content = toAmountStr(res.data?.sumIncomeBalance, 2, true)
      }
      state.listData = listData
    }
  })
  return {
    loading,
    ...toRefs(state)
  }
}
