import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function ({
  params = {},
}) {
  const state = reactive({
    baseInfo: {
      customerName: '',
      billNo: '',
      createdTime: '',
    },
    totalData: {
      label: '退款款总金额(元)',
      content: '',
    },
    listData: [],
  })
  // 重排账户列表，使基本账户在第一个
  const resortAccountList = (originList) => {
    const res = []
    originList && originList.forEach(item => {
      item.accountType === 0 ? res.unshift(item) : res.push(item)
    })
    return res
  }
  // 处理基础信息
  const dealBaseInfo = (data) => {
    state.baseInfo.customerName = data.customerName
    state.baseInfo.billNo = data.refundSn
    state.baseInfo.createdTime = data.createdTime
  }
  // 处理总数据
  const dealTotalData = (data) => {
    state.totalData.content = toAmountStr(data?.totalAmount, 2, true)
  }
  // 处理子账户数据
  const dealListData = (listData) => {
    state.listData = resortAccountList(listData).map(item => {
      return {
        label: item.accountName + '退款金额(元)',
        content: toAmountStr(item.amount, 2, true)
      }
    })
  }
  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getRefundDetail,
    params: {
      refundSn: params.turnoverSn
    },
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        dealBaseInfo(res.data)
        dealTotalData(res.data)
        dealListData(res.data.accountRefundDetail)
      }
    }
  })

  return {
    loading,
    ...toRefs(state)
  }
}
