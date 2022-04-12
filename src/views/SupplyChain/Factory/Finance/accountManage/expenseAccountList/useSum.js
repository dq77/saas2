import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function ({
  params = {},
  listData,
}) {
  const state = reactive({
    listData: [],
  })

  // 处理bar的数据
  const dealListData = (data) => {
    listData[0].content = data?.totalNum
    listData[1].content = toAmountStr(data?.totalAmount, 2, true)
    listData[2].content = data?.totalWaitNum
    listData[3].content = toAmountStr(data?.totalWaitAmount, 2, true)
    state.listData = listData
  }

  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getEnterExpenseSum,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        dealListData(res.data)
      }
    }
  })

  return {
    loading,
    ...toRefs(state)
  }
}
