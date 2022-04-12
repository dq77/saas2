import { reactive, toRefs } from '@vue/composition-api' // reactive
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default function ({
  deliverId,
  paramFlag,
  paramUpdateFlag,
}) {
  const state = reactive({
    tableList: [],
    summary: {
      productSum: 0,
      priceSum: [
        { label: '发货总价', value: 0 },
        { label: '含已退货', value: 0 },
        { label: '含退货中', value: 0 },
      ]
    }
  })

  // 计算整表总价
  const calculateTotalAmount = () => {
    let delivered = 0 // 发货总价
    let reversePrice = 0 // 含已退货
    let hasBeenReversePrice = 0 // 含退货中
    state.tableList.forEach(row => {
      delivered += row.currentDeliverTotalPrice
      row.reversePrice && (reversePrice += row.reversePrice)
      row.hasBeenReversePrice && (hasBeenReversePrice += row.hasBeenReversePrice)
    })
    state.summary.priceSum[0].value = delivered
    state.summary.priceSum[1].value = reversePrice
    state.summary.priceSum[2].value = hasBeenReversePrice
  }

  const { loading: getGoodsListloading } = useAsync({
    request: ajaxStore.factory.getCreateCargoList,
    params: {
      id: deliverId,
      flag: paramFlag,
      updateFlag: paramUpdateFlag
    },
    successCallBack: (res) => {
      if (res?.code === '0') {
        state.tableList = res?.data ?? []
        state.summary.productSum = res.data.length
        calculateTotalAmount()
      }
    }
  })

  return {
    getGoodsListloading,
    ...toRefs(state),
  }
}
