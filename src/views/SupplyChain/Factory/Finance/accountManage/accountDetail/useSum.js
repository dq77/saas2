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
    tabs: [],
    activeTab: '',
  })
  // 重排账户列表，使基本账户在第一个
  const resortAccountList = (originList) => {
    const res = []
    originList && originList.forEach(item => {
      item.accountType === 0 ? res.unshift(item) : res.push(item)
    })
    return res
  }

  // 处理bar的数据
  const dealListData = (data) => {
    listData[0].content = toAmountStr(data?.totalAmountBalance, 2, true)
    listData[1].content = toAmountStr(data?.totalAmountAvailable, 2, true)
    listData[2].content = toAmountStr(data?.totalAmountInFreeze, 2, true)
    listData[2].link.query = {
      customerId: data.customerId,
      customerName: data.customerName,
    }
    state.listData = listData
  }

  // 处理tabs的数据
  const dealTabsData = (arr) => {
    const accountList = resortAccountList(arr)
    state.tabs = accountList.map(item => {
      return {
        name: item.accountNo,
        label: item.accountTypeName,
        totalData: { label: '总余额（元）', content: toAmountStr(item.amountBalance, 2, true) },
        accountsData: [
          { label: '可用余额（元）', content: toAmountStr(item.amountAvailable, 2, true) },
          { label: '冻结中金额（元）', content: toAmountStr(item.amountInFreeze, 2, true) }
        ]
      }
    })
    state.activeTab = state.tabs.length ? state.tabs[0].name : ''
  }

  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getAccountDetailSum,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        dealListData(res.data)
        dealTabsData(res.data.accountDetailResponses)
      }
    }
  })

  return {
    loading,
    ...toRefs(state)
  }
}
