import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function ({
  params = {},
}) {
  const state = reactive({
    totalData: {
      label: '冻结中总金额(元)',
      content: '',
    },
    listData: [],
  })
  // 重排账户列表，使基本账户在第一个
  const resortAccountList = (originList) => {
    const res = []
    originList?.length && originList.forEach(item => {
      item.accountType === 0 ? res.unshift(item) : res.push(item)
    })
    return res
  }

  // 处理bar的数据
  const dealTotalData = (data) => {
    state.totalData.content = toAmountStr(data?.totalAmountInFreeze, 2, true)
  }

  // 处理tabs的数据
  const dealListData = (arr) => {
    const accountList = resortAccountList(arr)
    state.listData = accountList.map(item => {
      return {
        label: `${item.accountTypeName}冻结中金额（元）`,
        content: toAmountStr(item.amountInFreeze, 2, true),
      }
    })
  }

  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getAccountDetailSum,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        dealTotalData(res.data)
        dealListData(res.data.accountDetailResponses)
      }
    }
  })

  return {
    loading,
    ...toRefs(state)
  }
}
