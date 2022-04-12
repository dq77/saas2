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
        { label: '订单总金额', value: 0 },
        { label: '含退货中', value: 0 },
        { label: '含已退货', value: 0 },
      ]
    }
  })
  const { loading: baseInfoLoading } = useAsync({
    request: ajaxStore.factory.getOrderBasicInfo,
    params: { id: orderId },
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        const baseInfoData = res.data
        state.baseInfoData = baseInfoData

        state.summary.priceSum[1].value = baseInfoData.reversePrice || 0
        state.summary.priceSum[2].value = baseInfoData.hasBeenReversePrice || 0
      }
    }
  })
  const { loading: goodsLoading } = useAsync({
    request: ajaxStore.factory.getOrderProductInfo,
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
  }
}
