import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  orderId
}) {
  const state = reactive({
    baseInfoData: {},
    goodsData: [],
    summary: {
      productSum: 0,
      priceSum: [
        { label: '订单总金额：', value: 0 },
      ]
    }
  })
  const { loading: baseInfoLoading, doResult: getOrderBaseInfo } = useAsync({
    request: ajaxStore.dealer.getOrderBasicInfo,
    params: { id: orderId },
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        const baseInfoData = res.data
        baseInfoData.purchaseType = String(baseInfoData.purchaseType)
        state.baseInfoData = res.data
      }
    }
  })
  const { loading: goodsLoading } = useAsync({
    request: ajaxStore.dealer.getOrderProductInfo,
    params: { orderId },
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data?.length) {
        state.goodsData = res.data
        state.summary.productSum = res.data.length
        // 总价计算
        let totalAmount = 0
        res.data.forEach(row => {
          if (typeof row.payAmount === 'number') {
            totalAmount += row.payAmount
          }
        })
        state.summary.priceSum[0].value = totalAmount
      }
    }
  })

  return {
    baseInfoLoading,
    goodsLoading,
    ...toRefs(state),
    getOrderBaseInfo,
  }
}
