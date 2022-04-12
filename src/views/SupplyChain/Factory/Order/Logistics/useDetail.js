import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'


export default function ({
  orderId
}) {
  const state = reactive({
    loading: false,
    bagList: []
  })

  const { doResult: getBags } = useAsync({
    request: ajaxStore.factory.getLogisticsList,
    init: false
  })

  const { doResult: getBagDetail } = useAsync({
    request: ajaxStore.factory.getLogisticsDetail,
    init: false
  })

  const getDetail = async () => {
    state.loading = true
    const resBags = await getBags({ orderId, pageSize: 100 })
    if (resBags?.code === '0' && resBags?.data?.pagedRecords?.length) {
      const bagList = resBags.data.pagedRecords
      for (let i = 0; i < bagList.length; i++) {
        const resBagDetail = await getBagDetail({ deliverId: bagList[i].id })
        if (resBagDetail?.code === '0') {
          const dataSource = resBagDetail?.data ?? []
          dataSource.forEach(row => {
            row.name = row.goodsName // 字段名转换，为了goodsTableDetail组件显示用
          })
          bagList[i].dataSource = dataSource
        }
      }
      state.bagList = bagList
    }
    state.loading = false
  }

  getDetail()

  return {
    ...toRefs(state),
    getDetail,
  }
}
