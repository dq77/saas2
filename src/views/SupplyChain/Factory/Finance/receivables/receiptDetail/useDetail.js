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
      label: '收款总金额（元）',
      content: '',
    },
    listData: [],
    goodsData: [],
  })
  // 重排账户列表，使基本账户在第一个
  const resortAccountList = (originList) => {
    const res = []
    originList && originList.forEach(item => {
      // 财务管理迭代中，本来后端返回的类型都是number，后来变成了string，这里做兼容
      (item.accountType === 0 || item.accountType === '0') ? res.unshift(item) : res.push(item)
    })
    return res
  }
  // 处理基础信息
  const dealBaseInfo = (data) => {
    state.baseInfo.customerName = data.customerName
    state.baseInfo.billNo = data.paymentSn
    state.baseInfo.createdTime = data.createdTime
  }
  // 处理总数据
  const dealTotalData = (data) => {
    state.totalData.content = toAmountStr(data?.totalActPaymentAmount, 2, true)
  }
  // 处理子账户数据
  const dealListData = (listData) => {
    state.listData = resortAccountList(listData).map(item => {
      return {
        label: item.accountName + '收款金额（元）',
        content: toAmountStr(item.amount, 2, true)
      }
    })
  }
  // 处理产品信息
  const dealGoodsInfo = (listData) => {
    state.goodsData = listData.map(item => {
      // 单价金额格式化
      item.price = toAmountStr(item.price, 2, true)
      // 附加费的总价
      let tempAmount = 0
      if (item?.addedCostPriceVOS) {
        item.addedCostPriceVOS.forEach(item => {
          tempAmount += item.singleFee
          // 附加费金额格式化
          item.singleFee = toAmountStr(item.singleFee, 2, true)
        })
        item.addCostPriceList = item.addedCostPriceVOS
      }
      // 计算总价
      item.totalAmount = toAmountStr(item.price * item.quantity + tempAmount, 2, true)
      return item
    })
  }
  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getRepaymentDetail,
    params: {
      paymentSn: params.turnoverSn
    },
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        dealBaseInfo(res.data)
        dealTotalData(res.data)
        dealListData(res.data.accountPayDetail)
        dealGoodsInfo(res.data?.deliverItemVOList ?? [])
      }
    }
  })

  return {
    loading,
    ...toRefs(state)
  }
}
