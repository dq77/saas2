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
  const { loading, doResult } = useAsync({
    request: ajaxStore.factory.finance.getSumReceivables,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        listData[0].content = res.data?.sumIncomeNumber
        listData[1].content = toAmountStr(res.data?.sumIncomeBalance, 2, true)
        listData[2].content = `每月${res.data?.cycle}号`
        // 用于编辑时回显
        listData[2].cycle = res.data?.cycle
      }
      state.listData = listData
    }
  })
  return {
    loading,
    doResult,
    ...toRefs(state)
  }
}
