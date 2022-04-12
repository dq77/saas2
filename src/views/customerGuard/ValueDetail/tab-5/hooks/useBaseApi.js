// hooks
import useAsync from 'hooks/useAsync'
// others
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
// import { toAmountStr } from '@/utils/util'
export default (
  root
) => {
  const { corpName } = root.$route.query
  // 季度
  const { customer: { stratify: { getReportDate } } } = ajaxStore
  const reportDateApi = useAsync({ init: false, request: getReportDate })
  // 行业类型
  const { customer: { stratify: { getIndustry } } } = ajaxStore
  const industryApi = useAsync({ init: false, request: getIndustry, params: { fullName: corpName } })
  // 平均值
  const { customer: { stratify: { getAvgByTime } } } = ajaxStore
  const avgDataApi = useAsync({ init: false, request: getAvgByTime })
  // 查询行业季度财务报表
  const { customer: { stratify: { getByQuarter } } } = ajaxStore
  const byQuarterApi = useAsync({ init: false, request: getByQuarter })
  // 查询季度某一公司财务报表
  const { customer: { stratify: { getOneDealerByQuarter } } } = ajaxStore
  const oneDealerByQuarterApi = useAsync({ init: false, request: getOneDealerByQuarter })

  const state = reactive({
    reportDateApi,
    industryApi,
    avgDataApi,
    byQuarterApi,
    oneDealerByQuarterApi
  })

  return {
    ...toRefs(state)
  }
}
