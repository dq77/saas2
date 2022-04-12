import { computed, reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function() {
  const state = reactive({
    creditCate: { // 赊销评估
      quick: { // 快速
        doing: 0,
        toRead: 0
      },
      standard: { // 标准
        doing: 0,
        todo: 0,
        toRead: 0,
      },
      accurate: { // 精准
        doing: 0,
        todo: 0,
        toRead: 0,
      },
    },
    projectCate: { // 项目评估
      quick: { // 快速
        doing: 0
      },
      deep: { // 深度
        doing: 0
      }
    },
    riskCate: { // 风险舆情
      risk: 0, // 未读新闻舆情
      news: 0, // 未读风险事件
    },
    loading: false
  })
  const { loading: loadingCredit } = useAsync({
    request: ajaxStore.riskExperts.workbench.getMyMissions,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        state.creditCate.quick.doing = toAmountStr(data?.mapData?.FAST_MODE?.inProgressCount ?? 0, 0, true)
        state.creditCate.quick.toRead = toAmountStr(data?.mapData?.FAST_MODE?.toBeViewedCount ?? 0, 0, true)
        state.creditCate.standard.doing = toAmountStr(data?.mapData?.STANDARD_MODE?.inProgressCount ?? 0, 0, true)
        state.creditCate.standard.todo = toAmountStr(data?.mapData?.STANDARD_MODE?.tobeProcessedCount ?? 0, 0, true)
        state.creditCate.standard.toRead = toAmountStr(data?.mapData?.STANDARD_MODE?.toBeViewedCount ?? 0, 0, true)
        state.creditCate.accurate.doing = toAmountStr(data?.mapData?.ACCURATE_MODE?.inProgressCount ?? 0, 0, true)
        state.creditCate.accurate.todo = toAmountStr(data?.mapData?.ACCURATE_MODE?.tobeProcessedCount ?? 0, 0, true)
        state.creditCate.accurate.toRead = toAmountStr(data?.mapData?.ACCURATE_MODE?.toBeViewedCount ?? 0, 0, true)
        state.riskCate.risk = toAmountStr(data?.noreadEventCount ?? 0, 0, true)
        state.riskCate.news = toAmountStr(data?.noReadNewsCount ?? 0, 0, true)
      }
    }
  })
  const { loading: loadingProject } = useAsync({
    request: ajaxStore.riskExperts.workbench.getMyMissionsOfProject,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        state.projectCate.quick.doing = toAmountStr(data?.fastIng ?? 0, 0, true)
        state.projectCate.deep.doing = toAmountStr(data?.deepIng ?? 0, 0, true)
      }
    }
  })

  state.loading = computed(() => loadingCredit || loadingProject)

  return {
    ...toRefs(state)
  }
}
