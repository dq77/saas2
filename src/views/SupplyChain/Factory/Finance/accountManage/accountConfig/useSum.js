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
    request: ajaxStore.factory.finance.getSumAccount,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        listData[0].content = toAmountStr(res.data?.totalAmountAvailable, 2, true)
        listData[1].content = toAmountStr(res.data?.totalAmountInFreeze, 2, true)
        listData[2].content = toAmountStr(res.data?.totalAmountBalance, 2, true)
      }
      state.listData = listData
    }
  })
  return {
    loading,
    ...toRefs(state)
  }
}
