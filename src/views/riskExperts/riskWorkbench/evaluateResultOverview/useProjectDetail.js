import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function () {
  const state = reactive({
    quick: {
      totalValue: '0',
      chart: []
    },
    deep: {
      totalValue: '0',
      chart: [
        { name: '通过客户数', value: 0 },
        { name: '拒绝客户数', value: 0 },
      ]
    }
  })
  const { loading } = useAsync({
    request: ajaxStore.riskExperts.workbench.getProjectEvaluateResult,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        if (data?.map?.length) {
          // eslint-disable-next-line
          const originData = data['map']
          const sum = data?.fastCustom ?? 0
          state.quick.totalValue = toAmountStr(sum, 0, true)
          state.quick.chart = originData.map(item => {
            return {
              name: item.level,
              percent: (sum > 0 ? ((item?.count ?? 0) / sum * 100) : 0).toFixed(2) + '%',
              value: item?.count ?? 0,
            }
          })
        }
        state.deep.chart[0].value = data?.pass ?? 0
        state.deep.chart[1].value = data?.noPass ?? 0
        state.deep.totalValue = toAmountStr(data?.deepCustom ?? 0, 0, true)
      }
    }
  })

  return {
    loading,
    ...toRefs(state),
  }
}
