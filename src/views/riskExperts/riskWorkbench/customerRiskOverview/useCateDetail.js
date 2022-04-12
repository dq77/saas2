import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import { assetsBaseUrl } from '@/utils/config'

export default function({ success }) {
  const state = reactive({
    topData: [
      {
        label: '关注客户数',
        value: '0',
        iconUrl: assetsBaseUrl + '/riskExperts/workbench/block-icon-2.png'
      },
      {
        label: '风险客户数',
        value: '0',
        iconUrl: assetsBaseUrl + '/riskExperts/workbench/block-icon-1.png'
      },
    ],
    chartData: {
      totalValue: '0',
      dataList: []
    },
    cateOptions: [],
  })
  const { loading } = useAsync({
    request: ajaxStore.riskExperts.workbench.getCustomerRiskCate,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        state.topData[0].value = toAmountStr(data?.attentionCustomerCount ?? 0, 0, true)
        state.topData[1].value = toAmountStr(data?.riskCustomerCount ?? 0, 0, true)
        state.chartData.totalValue = toAmountStr(data?.eventTypeCount ?? 0, 0, true)
        state.chartData.dataList = data?.eventSticResponses?.length && data.eventSticResponses.map(item => {
          state.cateOptions.push({
            label: item.riskName,
            value: item.riskType
          })
          return {
            name: item.riskName,
            value: item.eventCount,
            percent: (item.eventCountProportion || 0) + '%'
          }
        })
        success()
      }
    }
  })

  return {
    loading,
    ...toRefs(state),
  }
}
